
// מערך תמונות הקינוחים לפי סדר האפשרויות בתפריט.
let radioImages = [
    document.getElementById("cakeImage"),
    document.getElementById("cookiesImage"),
    document.getElementById("pastryImage")
];

// מערך תמונות התוספות לפי סדר האפשרויות בתפריט.
let checkboxImages = [
    document.getElementById("chocolateImage"),
    document.getElementById("fruitImage"),
    document.getElementById("nutsImage"),
    document.getElementById("creamImage")
];

// -1 מציין שעדיין לא נבחר קינוח.
let selectedRecipe = -1;

let recipeNames = ["עוגה", "עוגיות", "מאפה"];
let recipeFiles = ["cake.png", "cookies.png", "pastry.png"];

let additionNames = ["שוקולד", "פירות", "אגוזים", "קצפת"];
let additionFiles = [
    "chocolate.png",
    "fruit.png",
    "nuts.png",
    "cream.png"
];

let checkboxIds = ["chocolate", "fruit", "nuts", "cream"];

// יצירת כתובת מלאה לתמונה בהתאם למיקום האתר.
function getImageUrl(fileName) {
    return new URL(fileName, document.baseURI).href;
}

// הגדרת מראה התמונות בפתיחת האתר.
function setInitialImages() {
    for (let i = 0; i < radioImages.length; i++) {
        radioImages[i].style.display = "none";
    }

    for (let i = 0; i < checkboxImages.length; i++) {
        checkboxImages[i].style.opacity = "0.5";
    }
}

// הצגת תמונת הקינוח שנבחר.
function showRecipe(index) {
    for (let i = 0; i < radioImages.length; i++) {
        radioImages[i].style.display = "none";
    }

    radioImages[index].style.display = "block";
    selectedRecipe = index;

    checkForm();
    updateOrder();
}

// שינוי שקיפות תמונת התוספת לפי מצב תיבת הסימון.
function changeAddition(index, checkboxId) {
    let checkbox = document.getElementById(checkboxId);

    if (checkbox.checked) {
        checkboxImages[index].style.opacity = "1";
    } else {
        checkboxImages[index].style.opacity = "0.5";
    }
}

// כפתור האישור פעיל רק אם הוזן שם ונבחר קינוח.
function checkForm() {
    let name = document.getElementById("userName").value.trim();

    document.getElementById("confirmButton").disabled =
        name === "" || selectedRecipe === -1;
}

// עדכון פתק ההזמנה לפי הבחירות.
function updateOrder() {
    let name = document.getElementById("userName").value.trim();
    let recipeText = document.getElementById("orderRecipe");
    let recipeImage = document.getElementById("orderRecipeImage");

    // הצגת שם המשתמש.
    document.querySelector(".name-label").textContent =
        name !== "" ? "שם: " + name : "שם:";

    // הצגת הקינוח שנבחר בפתק.
    if (selectedRecipe === -1) {
        recipeText.textContent = "עדיין לא נבחר קינוח";
        recipeImage.hidden = true;
        recipeImage.removeAttribute("src");
    } else {
        recipeText.textContent = recipeNames[selectedRecipe];
        recipeImage.src = getImageUrl(recipeFiles[selectedRecipe]);
        recipeImage.alt = "תמונה של " + recipeNames[selectedRecipe];
        recipeImage.hidden = false;
    }

    // ניקוי אזור התוספות בפתק.
    let additionsArea = document.getElementById("orderAdditions");
    additionsArea.textContent = "";

    let anySelected = false;

    // הצגת התוספות שנבחרו בלבד.
    for (let i = 0; i < checkboxIds.length; i++) {
        if (document.getElementById(checkboxIds[i]).checked) {
            anySelected = true;

            let item = document.createElement("div");
            item.className = "order-addition";

            let image = document.createElement("img");
            image.src = getImageUrl(additionFiles[i]);
            image.alt = "תמונה של " + additionNames[i];

            let caption = document.createElement("span");
            caption.textContent = additionNames[i];

            item.appendChild(image);
            item.appendChild(caption);
            additionsArea.appendChild(item);
        }
    }

    // הודעה אם לא נבחרו תוספות.
    if (!anySelected) {
        let empty = document.createElement("span");
        empty.className = "empty-note";
        empty.textContent = "התוספות שבחרתם יופיעו כאן";
        additionsArea.appendChild(empty);
    }
}

// אישור ההזמנה והצגת סיכום הבחירות.
function confirmForm() {
    let name = document.getElementById("userName").value.trim();

    if (name === "" || selectedRecipe === -1) {
        checkForm();
        return;
    }

    let selectedAdditions = [];

    for (let i = 0; i < checkboxIds.length; i++) {
        if (document.getElementById(checkboxIds[i]).checked) {
            selectedAdditions.push(additionNames[i]);
        }
    }

    let message =
        "שלום " + name + "! בחרתם: " +
        recipeNames[selectedRecipe] + ". ";

    if (selectedAdditions.length === 0) {
        message += "לא בחרתם תוספות.";
    } else {
        message += "התוספות שבחרתם: " +
            selectedAdditions.join(", ") + ".";
    }

    document.getElementById("confirmationText").textContent = message;
    document.getElementById("confirmationPopup").style.display = "flex";
}

// סגירת חלונית האישור.
function closePopup() {
    document.getElementById("confirmationPopup").style.display = "none";
}

// הפעלת ההגדרות הראשוניות.
setInitialImages();
updateOrder();
checkForm();
