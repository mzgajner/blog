---
title: "Hosting a Wolfenstein: Enemy Territory server in 2020"
date: 2020-08-23
---

It's safe to say [Wolfenstein: Enemy Territory](https://en.wikipedia.org/wiki/Wolfenstein:_Enemy_Territory) is the game that swallowed the biggest chunk of my life. Back in high school, at the peak of its popularity (which coincided with the peak of my puberty) pretty much everyone I knew was obsessed with it. [Clans](https://purans.zgajner.com/) were formed, [fragmovies](https://www.youtube.com/watch?v=CmnzmB9e03w) were edited, game configs were tweaked to hell and live games were streamed using a modded game client (because 2004 bandwidth).

Fifteen years later I shed a tiny nostalgic tear when one of my old buddies called in the middle of a COVID-19 lockdown and asked if I'm up for some ET to pass the time. We got tired of random public matches pretty soon and wanted to relive a proper 3on3 on some of our favorite maps, so as the _IT guy_ I was tasked with setting up a private server. In case you want to shoot some nazis in 2020, here are the steps:

1. **Tell everyone to get [ET: Legacy](https://www.etlegacy.com/)**. It's an open source rewrite of the game that's still being actively maintained, it works on latest versions of all desktop OSes and has the most servers available for it.

2. **Set up a VPS with your provider of choice**. For reference, I used the $5 instance on [Vultr](https://www.vultr.com/) and it handled 10 players without a hitch. Could probably do more, that's just the biggest crowd we managed to gather. Oh, and pick a geographical region nearby to get the lowest pings.

3. **Install [Docker](https://docs.docker.com/engine/install/ubuntu/#installation-methods)**. Alternatively, just select an image that comes with it preinstalled -- most providers offer the option during setup.

4. **Clone [this git repo](https://github.com/mzgajner/etlegacy-server) to your VPS and CD into it**
   ```sh
   git clone https://github.com/mzgajner/etlegacy-server.git
   cd etlegacy-server
   ```
   Everything should work out of the box, but take a look at `etl_server.cfg` and edit anything you might want to change, like the name of your server.

5. **Build and run the image**
   ```sh
   docker build --tag etlegacy --build-arg ET_PASSWORD=ServerPasswordHere
   docker run -p 27960:27960/udp -d etlegacy
   ```

6. **Deploy mortar!**
