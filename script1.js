const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");
const nameSend = get(".name-send-btn");


const BOT_IMG = "https://image.flaticon.com/icons/svg/327/327779.svg";
const MUNEER_ING = "https://avatars.githubusercontent.com/u/77039639";
const SENDER_IMG = "https://www.svgrepo.com/show/3852/boy.svg";
const PERSON_IMG = "https://image.flaticon.com/icons/svg/145/145867.svg";


self = ['Muneer', 'Muneer Alam', 'MUNEER ALAM', 'MUNEER', 'M ALAM', 'M Alam', 'muneer', 'muneer alam', 'm alam'];


function done() {
  myName = msgerInput.value;

  if (myName.trim() == '') return;

  appendMessage(myName, PERSON_IMG, "right", myName);
  msgerInput.value = "";
  appendMessage("BOT", BOT_IMG, "left", "Welcome " + myName + ", have fun! ;)");

  setTimeout(complete, 3000);
}

function complete() {
  msgerChat.innerHTML = '';

  let myBtn = document.createElement("button");
  myBtn.setAttribute("type", "submit");
  myBtn.setAttribute("class", "msger-send-btn");
  var text = document.createTextNode("Send");
  myBtn.appendChild(text);
  document.getElementsByClassName('msger-inputarea')[0].appendChild(myBtn);

  nameSend.parentNode.removeChild(nameSend);
}

function appendMessage(name, img, side, text) {
  //   Simple solution for small apps
  const msgHTML = `
    <div class="msg ${side}-msg">
      <div class="msg-img" style="background-image: url(${img})"></div>

      <div class="msg-bubble">
        <div class="msg-info">
          <div class="msg-info-name">${name}</div>
          <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div class="msg-text">${text}</div>
      </div>
    </div>
  `;

  msgerChat.insertAdjacentHTML("beforeend", msgHTML);
  msgerChat.scrollTop += 1500;
}


msgerForm.addEventListener("submit", event => {
  event.preventDefault();

  const msgText = msgerInput.value;
  if (msgText.trim() == '') return;


  if (self.includes(myName)) {
    appendMessage(myName, MUNEER_ING, "right", msgText);
  } else {
    appendMessage(myName, PERSON_IMG, "right", msgText);
  }


  msgerInput.value = "";


  firebase.database().ref("messages").push().set({
    "sender": myName,
    "message": msgText,
    "time": formatDate(new Date())
  });

});

firebase.database().ref("messages").on("child_added", function (snapshot) {
  if (snapshot.val().sender != myName) {
    var name = snapshot.val().sender;
    var text = snapshot.val().message;

    if (self.includes(name)) {
      appendMessage(name, MUNEER_ING, 'left', text);
    } else {
      appendMessage(name, SENDER_IMG, 'left', text);
    }
  }
});

// Utils
function get(selector, root = document) {
  return root.querySelector(selector);
}

function formatDate(date) {
  const h = "0" + date.getHours();
  const m = "0" + date.getMinutes();

  return `${h.slice(-2)}:${m.slice(-2)}`;
}