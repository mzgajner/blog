EDIT: I stumbled upon [this wonderful repo](//github.com/audreyr/favicon-cheat-sheet) the other day. It renders this entire blogpost obsolete.

The favicon has come along way since its humble 16 × 16 px beginnings. Screen resolutions are skyrocketing and visual representations of websites are needed in different applications on different devices. This post is intended to be a collection of many image sizes that can (should?) be included on modern websites.

- **standard favicon.ico file**
	Used to be just 16 × 16 px, but nowadays larger dimensions are necessary as well. E.g. pinning a website to the taskbar in Windows requires 32 × 32 px, double that for high pixel density displays and you're at 64 × 64 px. I recommend making separate versions instead of just making the largest one and letting the browser scale it since you want more control at these really small sizes. You can conveniently [merge them all](//demosthenes.info/blog/467/Creating-MultiResolution-Favicons-For-Web-Pages-With-GIMP) into one *.ico* file using GIMP.

- **iOS home screen icons**
These are used as icons when pinning websites to the home screen. There are 4 dimensions to cover 2 devices with 2 screen types each:
	- 57 × 57 px (iPhone)
	- 114 × 114 px (iPhone with *Retina display*)
	- 72 × 72 px (iPad)
	- 144 × 144 px (iPad with *Retina display*)

	You can also specify whether the image is precomposed or not (if not, the device will add some gloss and other effects over the image). More in [Safari Web Content Guide](//developer.apple.com/library/ios/#documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html).

- **Opera Speed Dial icon**
	Used as the thumbnail for Opera's Speed Dial screen. The minimum required dimension is 114 × 114 px, anything over 256 × 160 px will be resized, details on [Dev.Opera](//dev.opera.com/articles/view/opera-speed-dial-enhancements/).

- **Windows 8 Start Screen tile**
	Displayed on all devices with Windows 8 when you pin a website to the Start Screen. The required dimension is 144 × 144 px, Microsoft provided [an official tool](//www.buildmypinnedsite.com/) that helps you with the process.
