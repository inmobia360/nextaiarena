# NextAI Arena brand assets

## Official files

- Full logo / wordmark: `Logo_NextAI_Arena_.png`
- Icon / favicon source: `Favicon_NextAI_Arena.png`

Both files currently live in the project root. They are the source-of-truth brand assets until the project owner approves a replacement or a named derivative.

## Required usage

- Use the full logo where the brand name must be readable.
- Use the icon/favicon where space is limited: browser icon, compact navigation, app icon, avatar, and small status surfaces.
- Preserve proportions and the original color treatment.
- Do not stretch, skew, rotate, add unapproved effects, or place text over the mark.
- Keep sufficient clear space and contrast against the surrounding background.
- Use `NextAI Arena` as the accessible name when the mark conveys identity or navigation.
- Use an empty alt attribute only when the adjacent text already communicates the same information.
- Include the approved mark in page metadata, Open Graph/Twitter-style previews, authentication/empty states, transactional emails, and project documentation when those surfaces are implemented.

## Asset validation before production

The current files should be treated as visual references first and production-ready assets only after validation. Their current technical characteristics are:

- `Favicon_NextAI_Arena.png`: 1402 x 1122, RGB, no alpha channel.
- `Logo_NextAI_Arena_.png`: 2105 x 747, RGB, no alpha channel.

The images appear to contain a checkerboard-style light background rather than a transparent alpha channel. Before using them on arbitrary backgrounds or converting the favicon, verify whether that pattern is baked into the pixels. If confirmed, produce approved derivatives with:

- transparent background where appropriate;
- favicon sizes suitable for browser use, including a square icon source;
- optimized web formats without visible halos;
- preserved original files as immutable sources;
- documented filenames and dimensions.

Do not delete or overwrite the originals while preparing derivatives. Do not use an automated background-removal result in production without visual inspection on light, dark, and branded backgrounds.

## Brand QA checklist

- Correct asset selected for the surface.
- No distortion, unintended crop, or low-resolution scaling.
- No checkerboard or unwanted background visible.
- Readable at desktop and mobile sizes.
- Sufficient contrast and visible focus treatment around interactive logos.
- Correct accessible name or decorative alt behavior.
- Favicon and social preview resolve on the deployed domain.
- Asset paths are stable, cached safely, and included in the deployment artifact.
- No generated or temporary variant has replaced the official source.
