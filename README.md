# livres
Scraping of the <a href = "https://myaccount.lrwriters.com">Livingston website</a><br>
The program monitors the website and notifies about orders with a given price.<br>
In other words, this program saves you from constantly reloading the website and searching for good orders.<br>
<img src="https://raw.githubusercontent.com/dmytro-pazynych/livres/master/pics/login.png" alt="login"><br>
<img src="https://raw.githubusercontent.com/dmytro-pazynych/livres/master/pics/console.png" alt="console"><br>
<img src="https://raw.githubusercontent.com/dmytro-pazynych/livres/master/pics/notification.png" alt="notification"><br>
<h2>How to install</h2>
<ol>
  <li> <a href = "https://nodejs.org/en/download/">Install Node JS</a></li>
  <li> <a href = "http://www.growlforwindows.com/gfw/d.ashx?f=GrowlInstaller.exe">Install Growl</a></li>
  <li> <a href = "https://github.com/dmytro-pazynych/livres/archive/master.zip">Download</a> all files and unpack them in one folder</li>
  <li> Open Windows Command Prompt:<br>
    Inside the search field from your taskbar, enter command or cmd. Then, click or tap on the Command Prompt result.<br>
    <img src="https://www.digitalcitizen.life/sites/default/files/gdrive/win_start_cmd/cmd_1.png" alt="cmd"><br>
    Replace the working directory with the directory of the folder, where the files are located:<br>
    1. Type in <b>cd</b> followed by a space.<br>
    2. Type in your folder directory path.<br>
    3. Press Enter.<br>
    <img src="https://raw.githubusercontent.com/dmytro-pazynych/livres/master/pics/dir.png" alt="dir"><br>
    <img src="https://raw.githubusercontent.com/dmytro-pazynych/livres/master/pics/cd.png" alt="cd"><br>
  </li>
 
  
  
  <li> 
    Install the required modules (puppeteer, readline-sync, growl, firebase):<br>
    A package can be downloaded with the command <b>npm "module name" install --save</b><br>
    <img src="https://raw.githubusercontent.com/dmytro-pazynych/livres/master/pics/mod.png" alt="npm"><br>
    1. <b>npm install puppeteer --save</b><br>
    2. <b>npm install readline-sync --save</b><br>
    3. <b>npm install growl --save</b><br>
    4. <b>npm install firebase --save</b><br>
  </li>
  <li> 
    Run livres.js<br>
    1. Run the command <b>node livres.js</b><br>
    <img src="https://raw.githubusercontent.com/dmytro-pazynych/livres/master/pics/livres.png" alt="run"><br>
  </li>
  <li>Use your login and password to run the programm</li>
</ol>
