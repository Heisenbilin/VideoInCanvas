环境要求：在项目目录下创建服务器，以防止浏览器对ctx.getImageData()方法的跨域保护。

具体配置：1.npm install http-server -g

        2.http-server -p 8081

按照上面两条语句启动服务器后如需访问video.html，在浏览器地址栏输入http://localhost:8081/video.html

主要思路：
    Canvas中可以使用ctx.drawImage(video, x, y,width,height)来对视频当前帧的图像进行绘制，其中video参数就是HTML5中的video标签。故我们可以通过Canvas的动态效果不断获取video当前画面，渲染到Canvas画布上。并且通过改变video标签的属性，来实现在Canvas中处理视频的一整套效果。可以理解成在Canvas中新建一个播放器，该播放器视频源是video标签创建，播放器的各种方法最终指向对video标签本身属性和方法的改变。而利用Canvas的强大功能，可以进一步进行图像处理、弹幕加载等操作。

 Video标签属性和事件：参见https://zhuanlan.zhihu.com/p/59934212

第一步：创建video标签
//创建Video标签
video = document.createElement('Video');
video.src = './video.ogv';
video.controls = true;

//将video标签插入dom结点，用于展示原始video。首先应该在body中有一个id为videodiv的div结点。****在实战中不需要插入dom结点（不用添加下面两行语句）就可以使用上面创建的video对象****
var videodiv=document.getElementById('videodiv');
videodiv.appendChild(video);

第二步：Canvas中不断绘制video标签内容
render()
function render() {
    window.requestAnimationFrame(render)
    ctx.clearRect(0, 0,canvas.width,canvas.height)
    ctx.drawImage(video, 0, 0,width,height)  //绘制视频
}

第三步：通过改变video标签来控制Canvas中的视频呈现

主要方法有（具体实现参照源代码）：

playVideo()  //控制Video的播放

videoPlayer  //重写后的进度条对象

changeVolume() //控制音量（未实现，可以按照上面两个的实现方法进行实现）

第四步 ：利用Canvas添加有趣的功能

主要方法有（具体实现参照源代码）：

scalemini()  //缩小视频画面

scalelarge()   //放大视频画面

changeStyle()  //改变视频风格

addNewWord()  //给视频添加弹幕

以上基本实现了Canvas中对视频的加载和简单处理，开发人员可以在此基础上考虑更多的细节，充分运用到开发项目中。
