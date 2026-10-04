"""Compress oversized published MP3 files without modifying source recordings."""
from pathlib import Path
import argparse,json,subprocess,tempfile
from hashlib import sha256

def run(args):
    return subprocess.run(args,check=True,capture_output=True,text=True).stdout

def duration(path):
    metadata=json.loads(run(['ffprobe','-v','error','-show_entries','format=duration','-of','json',str(path)]))
    return float(metadata['format']['duration'])

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root',default='public')
    parser.add_argument('--report',default='docs/AUDIO_COMPRESSION_REPORT.json')
    args=parser.parse_args();report=Path(args.report)
    previous=json.loads(report.read_text(encoding='utf-8')) if report.is_file() else []
    records={row['file']:row for row in previous};changed=[]
    for path in sorted(Path(args.root).rglob('*.mp3')):
        before=path.stat().st_size
        if before<=500000:continue
        previous_row=records.get(path.as_posix())
        if previous_row and previous_row.get('sha256')==sha256(path.read_bytes()).hexdigest():continue
        seconds=duration(path);budget=1000000 if seconds>120 else 500000
        rates=[r for r in [64,56,48,40,32,24,16,8] if r*1000*seconds/8<=budget*.95]
        if not rates:raise ValueError(f'Audio too long for supported MP3 rates: {path}')
        with tempfile.TemporaryDirectory(prefix='game01-mp3-') as folder:
            output=Path(folder)/'compressed.mp3'
            for rate in rates:
                run(['ffmpeg','-y','-v','error','-i',str(path),'-map','0:a:0','-map_metadata','-1','-vn','-c:a','libmp3lame','-b:a',f'{rate}k','-ar','24000','-ac','2','-write_xing','1',str(output)])
                if output.stat().st_size<=budget:break
            assert output.stat().st_size<=budget,path
            assert abs(duration(output)-seconds)<.25,path
            run(['ffmpeg','-v','error','-i',str(output),'-f','null','-'])
            if output.stat().st_size>=before:continue
            path.write_bytes(output.read_bytes())
        row={'file':path.as_posix(),'duration_seconds':round(seconds,3),'before_bytes':before,'after_bytes':path.stat().st_size,'bitrate_kbps':rate,'sample_rate':24000,'channels':2,'sha256':sha256(path.read_bytes()).hexdigest()}
        records[row['file']]=row;changed.append(row)
    report.parent.mkdir(parents=True,exist_ok=True);report.write_text(json.dumps(list(records.values()),ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
    print(f'Compressed {len(changed)} MP3 files: {sum(r["before_bytes"] for r in changed):,} -> {sum(r["after_bytes"] for r in changed):,} bytes')

if __name__=='__main__':main()
