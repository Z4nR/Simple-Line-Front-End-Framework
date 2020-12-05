window.onload = function() {
    const useNodeJS = false;   
    const defaultLiffId = "1653655701-9mRB2Wzm";   

    let myLiffId = "";

    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                document.getElementById("liffAppContent").classList.add('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};

function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("liffAppContent").classList.add('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            
            initializeApp();
        })
        .catch((err) => {
            document.getElementById("liffAppContent").classList.add('hidden');
        });
}

function initializeApp() {
    displayLiffData();
    displayIsInClientInfo();
    registerButtonHandlers();
}

function displayLiffData() {
    document.getElementById('isInClient').textContent = liff.isInClient();
    document.getElementById('isInClient').style.visibility ='hidden';
}

function displayIsInClientInfo() {
    if (liff.isInClient()) {
        document.getElementById('isInClientMessage').textContent = 'Dibuka di browser LINE';
    } else {
        document.getElementById('isInClientMessage').textContent = 'Dibuka di eksternal browser';
    }
}

function registerButtonHandlers() {
    document.getElementById('openWindowButton').addEventListener('click', function() {
        liff.openWindow({
            url: 'https://h3llo-w0rld.herokuapp.com/',
            external: true
        });
    });

    document.getElementById('closeWindowButton').addEventListener('click', function() {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.closeWindow();
        }
    });
}

function sendAlertIfNotInClient() {
    alert('Ndak Bisa Bro, Mesti lewat LINE');
}