"""Export generated adventure backgrounds and transparent sprite atlases as local WebP."""
from pathlib import Path
import argparse,json
from PIL import Image
NAMES={
'forest':['squirrel','squirrel-wave','hedgehog','hedgehog-eat','basket','basket-closed','leaf','mat-folded','mat-open','apple','cup','lunchbox','bud','flower','bird','butterfly'],
'snow':['rabbit','rabbit-wave','bear','bear-wave','penguin','penguin-wave','mittens','carrot','snowman','snowman-complete','pine-snow','pine-clear','scarf','lantern','plate','star'],
'dino':['dinosaur','dinosaur-wave','dinosaur-eat','dinosaur-bag','baby','baby-flower','leaf','backpack','fern','board','egg','egg-open','flower','spring','door','blanket'],
'space':['rabbit','rabbit-wave','bear','bear-wave','star','star-wave','ship','helmet','pad-folded','pad-open','bud','flower','envelope','mailbox','lamp','cushion']}
# Generated atlases have uneven row heights. Crop along the inspected empty
# gutters rather than a nominal grid, so boots and neighbouring props survive.
ROW_GUTTERS={'forest':[0,320,620,905,1280],'snow':[0,355,650,947,1280],'dino':[0,330,620,940,1280],'space':[0,370,660,940,1280]}
def export(im,path,max_size):
 im.thumbnail(max_size);path.parent.mkdir(parents=True,exist_ok=True)
 for quality in [88,82,76,70,64]:
  im.save(path,'WEBP',quality=quality,method=6)
  if path.stat().st_size<=300000:break
 assert path.stat().st_size<=300000,path
 return {'file':path.as_posix(),'width':im.width,'height':im.height,'bytes':path.stat().st_size}
def crop_cell(im,box):
 cell=im.crop(box);mask=cell.getchannel('A').point(lambda v:255 if v>40 else 0)
 # Atlas cells can contain disconnected feet from a neighboring row. Keep the
 # largest object's bounds, while preserving the original soft alpha inside it.
 mask.thumbnail((160,160));pixels=mask.load();visited=set();components=[]
 for y in range(mask.height):
  for x in range(mask.width):
   if not pixels[x,y] or (x,y) in visited:continue
   pending=[(x,y)];visited.add((x,y));points=[]
   while pending:
    px,py=pending.pop();points.append((px,py))
    for nx,ny in [(px-1,py),(px+1,py),(px,py-1),(px,py+1)]:
     if 0<=nx<mask.width and 0<=ny<mask.height and pixels[nx,ny] and (nx,ny) not in visited:visited.add((nx,ny));pending.append((nx,ny))
   components.append(points)
 assert components
 largest=max(components,key=len);sx=cell.width/mask.width;sy=cell.height/mask.height
 bounds=(max(0,int(min(x for x,y in largest)*sx)-3),max(0,int(min(y for x,y in largest)*sy)-3),min(cell.width,int((max(x for x,y in largest)+1)*sx)+3),min(cell.height,int((max(y for x,y in largest)+1)*sy)+3))
 return cell.crop(bounds)
def main():
 ap=argparse.ArgumentParser();ap.add_argument('manifest');ap.add_argument('--sleep-manifest');ap.add_argument('--record',default='.test-deps/adventure-export.json');args=ap.parse_args();records=[]
 for row in json.loads(Path(args.manifest).read_text(encoding='utf-8-sig')):
  source=Image.open(row['source']).convert('RGBA');name=row['id'];theme=name.split('-')[0]
  if name.endswith('-atlas'):
   assert source.getchannel('A').getextrema()[0]==0
   for i,sprite in enumerate(NAMES[theme]):
    x=i%4;y=i//4;rows=ROW_GUTTERS[theme]
    columns=[0,350,635,945,1280] if theme=='forest' and y==2 else [0,320,640,960,1280]
    cell=crop_cell(source,(round(columns[x]*source.width/1280),round(rows[y]*source.height/1280),round(columns[x+1]*source.width/1280),round(rows[y+1]*source.height/1280)))
    records.append(export(cell,Path('public/images/themes')/theme/'sprites'/(sprite+'.webp'),(600,600)))
  else:records.append(export(source.convert('RGB'),Path('public/images/themes')/theme/'scenes'/(name+'.webp'),(800,1200)))
 if args.sleep_manifest:
  for row in json.loads(Path(args.sleep_manifest).read_text(encoding='utf-8-sig')):
   source=Image.open(row['source']).convert('RGBA');name=row['id']
   if name=='rest-atlas':
    for i,(theme,sprite) in enumerate([('snow','penguin-rest'),('dino','baby-rest')]):
     cell=crop_cell(source,(round(i*source.width/2),0,round((i+1)*source.width/2),source.height));records.append(export(cell,Path('public/images/themes')/theme/'sprites'/(sprite+'.webp'),(600,700)))
   else:
    theme=name.split('-')[0];name=name.removesuffix('-initial');records.append(export(source.convert('RGB'),Path('public/images/themes')/theme/'scenes'/(name+'.webp'),(800,1200)))
 Path(args.record).write_text(json.dumps(records,ensure_ascii=False,indent=2),encoding='utf-8');print('Exported',len(records),'files; largest',max(r['bytes'] for r in records),'bytes')
if __name__=='__main__':main()
