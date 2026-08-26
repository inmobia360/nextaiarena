"""Create non-destructive transparent/light/dark NextAI Arena brand derivatives."""

from collections import deque
from pathlib import Path

from PIL import Image


ROOT = Path(__file__).resolve().parents[1]


def is_checkerboard_pixel(rgb):
    r, g, b = rgb
    return max(rgb) - min(rgb) <= 10 and min(rgb) >= 220


def remove_edge_connected_checkerboard(source):
    image = source.convert("RGBA")
    width, height = image.size
    pixels = image.load()
    visited = bytearray(width * height)
    queue = deque()

    def enqueue(x, y):
        index = y * width + x
        if not visited[index] and is_checkerboard_pixel(pixels[x, y][:3]):
            visited[index] = 1
            queue.append((x, y))

    for x in range(width):
        enqueue(x, 0)
        enqueue(x, height - 1)
    for y in range(height):
        enqueue(0, y)
        enqueue(width - 1, y)

    while queue:
        x, y = queue.popleft()
        pixels[x, y] = (*pixels[x, y][:3], 0)
        for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
            if 0 <= nx < width and 0 <= ny < height:
                enqueue(nx, ny)

    return image


def remove_large_checkerboard_regions(image, minimum_size=1200):
    """Remove enclosed checkerboard regions while preserving small white logo details."""
    result = image.copy()
    pixels = result.load()
    width, height = result.size
    visited = bytearray(width * height)

    for start_y in range(height):
        for start_x in range(width):
            start_index = start_y * width + start_x
            if visited[start_index] or not pixels[start_x, start_y][3]:
                continue
            if not is_checkerboard_pixel(pixels[start_x, start_y][:3]):
                visited[start_index] = 1
                continue

            component = []
            queue = deque([(start_x, start_y)])
            visited[start_index] = 1
            while queue:
                x, y = queue.popleft()
                component.append((x, y))
                for nx, ny in ((x - 1, y), (x + 1, y), (x, y - 1), (x, y + 1)):
                    if not (0 <= nx < width and 0 <= ny < height):
                        continue
                    index = ny * width + nx
                    if visited[index] or not pixels[nx, ny][3]:
                        continue
                    visited[index] = 1
                    if is_checkerboard_pixel(pixels[nx, ny][:3]):
                        queue.append((nx, ny))

            if len(component) >= minimum_size:
                for x, y in component:
                    r, g, b, _ = pixels[x, y]
                    pixels[x, y] = (r, g, b, 0)
    return result


def make_dark_wordmark(image):
    result = image.copy()
    pixels = result.load()
    for y in range(result.height):
        for x in range(result.width):
            r, g, b, a = pixels[x, y]
            if x >= int(result.width * 0.32) and a and r < 50 and g < 65 and b < 135:
                pixels[x, y] = (255, 255, 255, a)
    return result


def save(image, filename):
    output = ROOT / filename
    image.save(output, "PNG", optimize=True)
    return output


def main():
    logo = remove_large_checkerboard_regions(
        remove_edge_connected_checkerboard(Image.open(ROOT / "Logo_NextAI_Arena_.png"))
    )
    favicon = remove_large_checkerboard_regions(
        remove_edge_connected_checkerboard(Image.open(ROOT / "Favicon_NextAI_Arena.png"))
    )

    save(logo, "Logo_NextAI_Arena_light.png")
    save(make_dark_wordmark(logo), "Logo_NextAI_Arena_dark.png")
    save(favicon, "Favicon_NextAI_Arena_transparent.png")

    for path in (
        ROOT / "Logo_NextAI_Arena_light.png",
        ROOT / "Logo_NextAI_Arena_dark.png",
        ROOT / "Favicon_NextAI_Arena_transparent.png",
    ):
        image = Image.open(path)
        if image.mode != "RGBA" or "A" not in image.getbands():
            raise RuntimeError(f"Asset is not RGBA: {path}")
        if image.getchannel("A").getextrema()[0] != 0:
            raise RuntimeError(f"No transparent pixels found: {path}")
        print(f"{path.name}: {image.size}, {image.mode}")


if __name__ == "__main__":
    main()
