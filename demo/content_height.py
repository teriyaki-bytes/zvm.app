"""Print the height a recording should be cropped to: the lowest non-background
pixel seen in any frame, plus bottom padding. Needs ffmpeg and Pillow.

Usage: python3 demo/content_height.py VIDEO.mp4
"""

import glob
import os
import subprocess
import sys
import tempfile

from PIL import Image

BACKGROUND = (0x1D, 0x16, 0x11)  # theme.tape "background"
PADDING = 30


def main(video):
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(
            ["ffmpeg", "-nostdin", "-loglevel", "error", "-i", video, "-vf", "fps=2", f"{tmp}/%04d.png"],
            check=True,
        )
        lowest = 0
        height = 0
        for frame in sorted(glob.glob(os.path.join(tmp, "*.png"))):
            im = Image.open(frame).convert("RGB")
            width, height = im.size
            data = im.tobytes()
            for y in range(height - 1, lowest, -1):
                row = y * width * 3
                if any(
                    sum(abs(data[row + x * 3 + i] - BACKGROUND[i]) for i in range(3)) > 40
                    for x in range(0, width, 3)
                ):
                    lowest = y
                    break
    crop = min(height, lowest + PADDING)
    print(crop + crop % 2)


if __name__ == "__main__":
    main(sys.argv[1])
