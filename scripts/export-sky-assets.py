"""Export generated sprite atlases and backgrounds to local bounded-size WebP.

Only slices supplied atlas cells and converts/compresses; illustration generation
is performed with imagegen. Source PNGs remain outside the published project.
"""
import argparse
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / 'public/images/themes/sky/adventure'
OUTPUT.mkdir(parents=True, exist_ok=True)

def save(image, name):
    image.thumbnail((1200, 900), Image.Resampling.LANCZOS)
    output = OUTPUT / (name + '.webp')
    for quality in (88, 82, 75, 68, 60):
        image.save(output, 'WEBP', quality=quality, method=6)
        if output.stat().st_size <= 300000:
            break
    assert output.stat().st_size <= 300000, output
    print(name, image.size, output.stat().st_size)

def atlas(path, columns, names):
    source = Image.open(path).convert('RGBA')
    # Generated watercolor silhouettes slightly exceed the nominal grid.
    # Checked cell rectangles exclude neighbouring feet, pillows and flecks.
    checked = {
        'rabbit': (0, 0, 313, 329), 'rabbit-wave': (313, 0, 627, 329),
        'bear': (627, 0, 940, 332), 'bear-wave': (940, 0, 1254, 333),
        'balloon': (0, 332, 313, 650), 'train': (313, 332, 627, 648),
        'bird': (627, 340, 940, 650), 'bird-fly': (940, 337, 1254, 650),
        'pigeon': (0, 651, 313, 940), 'pigeon-fly': (313, 650, 627, 940),
        'firefly': (627, 650, 940, 940), 'hat': (940, 666, 1254, 940),
        'letter': (0, 960, 313, 1240), 'umbrella': (313, 943, 627, 1240),
        'rotor': (627, 943, 940, 1240), 'blanket': (940, 943, 1254, 1240),
        'rabbit-seated': (0, 0, 417, 444), 'bear-hat': (417, 0, 835, 448),
        'bear-blow': (835, 0, 1254, 448), 'basket': (0, 455, 417, 810),
        'carriage': (417, 450, 835, 810), 'rainbow': (835, 500, 1254, 800),
        'rabbit-rest': (0, 821, 417, 1248), 'bear-rest': (417, 821, 835, 1248),
        'blanket-open': (835, 821, 1254, 1248),
    }
    for i, name in enumerate(names):
        x, y = i % columns, i // columns
        box = checked[name]
        cell = source.crop(tuple(round(v * source.width / 1254) for v in box))
        bounds = cell.getchannel('A').point(lambda a: 255 if a > 35 else 0).getbbox()
        assert bounds, name
        cell = cell.crop(bounds)
        save(cell, name)
        if name == 'rainbow':
            save(cell.crop((round(cell.width * .36), 0, round(cell.width * .64), round(cell.height * .74))), 'rainbow-piece')

parser = argparse.ArgumentParser()
parser.add_argument('--atlas')
parser.add_argument('--extra')
parser.add_argument('--awake')
parser.add_argument('--sprite', nargs=2, action='append', default=[])
parser.add_argument('--background', nargs=2, action='append', default=[])
args = parser.parse_args()
if args.atlas:
    atlas(args.atlas, 4, ['rabbit', 'rabbit-wave', 'bear', 'bear-wave', 'balloon', 'train', 'bird', 'bird-fly', 'pigeon', 'pigeon-fly', 'firefly', 'hat', 'letter', 'umbrella', 'rotor', 'blanket'])
if args.extra:
    atlas(args.extra, 3, ['rabbit-seated', 'bear-hat', 'bear-blow', 'basket', 'carriage', 'rainbow', 'rabbit-rest', 'bear-rest', 'blanket-open'])
if args.awake:
    source = Image.open(args.awake).convert('RGBA')
    for i, name in enumerate(['rabbit-awake', 'bear-awake']):
        cell = source.crop((i * source.width // 2, 0, (i + 1) * source.width // 2, source.height))
        bounds = cell.getchannel('A').point(lambda a: 255 if a > 35 else 0).getbbox()
        save(cell.crop(bounds), name)
for name, path in args.background:
    save(Image.open(path).convert('RGB'), name)
for name, path in args.sprite:
    sprite = Image.open(path).convert('RGBA')
    bounds = sprite.getchannel('A').point(lambda a: 255 if a > 35 else 0).getbbox()
    assert bounds, path
    save(sprite.crop(bounds), name)
