console.log('iframe');

(function () {
    var dataFrame = document.getElementsByClassName('data')[0];
    function listener(event) {
        dataFrame.innerHTML+= '<br>' + event.data;
        event.source.postMessage('added', 'http://localhost:63342/');
    }

    if (window.addEventListener) {
        window.addEventListener("message", listener);
    } else {
        window.attachEvent("onmessage", listener);
    }
})();