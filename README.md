# Prem Arvinth G — Portfolio

My personal portfolio: full-stack .NET developer (Angular · C# / ASP.NET Core · SQL Server) at Russell Tobin, Chennai.

🔗 **Live:** https://prem-arvinth-g.github.io/Online_Portfolio/

## Built with

- Plain HTML, CSS and JavaScript, with no build step
- [GSAP](https://gsap.com/) + ScrollTrigger for the intro and scroll-driven animations
- [Lenis](https://github.com/darkroomengineering/lenis) for smooth scrolling
- Fonts: Bricolage Grotesque and Geist Mono (Google Fonts)

The page works without JavaScript animations: it respects `prefers-reduced-motion` and stays fully readable if the CDN scripts fail.

## Features

- An animated request trace in the hero (Angular → ASP.NET → SQL Server)
- A scroll-driven "one request, three layers" section
- Expandable project list with filters by layer
- Command palette: press **Ctrl / ⌘ + K** or **/**

## Run locally

```bash
python -m http.server 8000
# open http://localhost:8000
```

## Previous version

The original Data Analyst / ECE portfolio is kept in git history under the tag
[`v1-original-portfolio`](https://github.com/prem-arvinth-g/Online_Portfolio/tree/v1-original-portfolio).
