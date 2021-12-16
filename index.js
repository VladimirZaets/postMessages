console.log('index1');
(function () {
    var localFrame = window.frames.localFrame,
        externalFrame = window.frames.externalFrame,
        sendButton = document.getElementsByName('send')[0],
        radioButtons = document.getElementsByName('selectFrame'),
        addedMessageToLocal = document.getElementsByClassName('addedToLocalFrame')[0],
        addedToExternalFrame = document.getElementsByClassName('addedToExternalFrame')[0];

    addedMessageToLocal.innerText = 0;
    addedToExternalFrame.innerText = 0;

    function listener(event) {
        if (event.origin === window.location.origin && event.data === 'added') {
            addedMessageToLocal.innerText = ++addedMessageToLocal.innerText;
        } else if (event.origin === 'https://fiddle.jshell.netc' && event.data === 'added') {
            addedToExternalFrame.innerText = ++addedToExternalFrame.innerText;
        }
    }

    if (window.addEventListener) {
        window.addEventListener("message", listener);
    } else {
        window.attachEvent("onmessage", listener);
    }

    sendButton.addEventListener('click', function (event) {
        var message = document.getElementsByName('message')[0].value,
            sendTo = getRadioButtonsValue();

        event.preventDefault();

        if (message && sendTo === 'local') {
            localFrame.postMessage(message, 'http://localhost:63342/');
        } else if (message && sendTo === 'external') {
            externalFrame.postMessage(message, 'https://fiddle.jshell.net');
        }
    });


    function getRadioButtonsValue() {
        var i = 0,
            length = radioButtons.length;

        for (i; i<length; i++) {
            if (radioButtons[i].checked) {
                return radioButtons[i].value;
            }
        }
    }
})();
