## Opening Folder as Vault 
- go to obsidian app, open folder as vault -> Select the "docs" folder of docusaurus react project as vault folder
![](assets/Pasted%20image%2020260831201919.png)


![](assets/Pasted%20image%2020260831201754.png)

## Fix File references to not encounter image and path related issues
If not done, then obsidian will path them incorrectly (by default) so make sure you are placing them at right place so that vs code and final react webpage build can find the image at right path.

- Go to <span style={{color: "#2f9e44"}}>sidebar</span> and press <span style={{color: "#2f9e44"}}>settings button</span>
![](assets/Pasted%20image%2020260831203146.png)

- Go to <span style={{color: "#2f9e44"}}>Files and Links tab</span>
- For <span style={{color: "#e0313a"}}>default location</span> , choose <span style={{color: "#2f9e44"}}>In subfolder under current folder</span>
- Give a <span style={{color: "#e0313a"}}>name</span> to subfolder eg. <span style={{color: "#2f9e44"}}>assets</span>
- in <span style={{color: "#e0313a"}}>New link format</span>  -> <span style={{color: "#2f9e44"}}>Relative path to file</span>
- turn <span style={{color: "#2f9e44"}}>on</span> <span style={{color: "#e0313a"}}>Automatically update internal links</span>
- turn <span style={{color: "#2f9e44"}}>off</span> use <span style={{color: "#e0313a"}}>WikiLinks</span> (obsidian's way to link image). We are turning it off because we want native Markdown way of referencing a image, not a obsidian way otherwise it will not work on other platforms.
Refer to attachment below.
![](assets/Pasted%20image%2020260831203523.png)

Then go to editor tab and toggle on strict Line breaks so that it matches the deployed version
![](assets/Pasted%20image%2020260901183809.png)