
// מערך שמכיל את תמונות המאפים לפי סדר האפשרויות בטופס.
let radioImages = [
    document.getElementById("cakeImage"),
    document.getElementById("cookiesImage"),
    document.getElementById("pastryImage")
];

// מערך שמכיל את תמונות התוספות לפי סדר האפשרויות בטופס.
let checkboxImages = [
    document.getElementById("chocolateImage"),
    document.getElementById("fruitImage"),
    document.getElementById("nutsImage"),
    document.getElementById("creamImage")
];

// הערך ‎-1 מציין שעדיין לא נבחר קינוח.
let selectedRecipe = -1;

// שמות הקינוחים ונתיבי התמונות שלהם.
// כל התמונות נמצאות בתיקייה הראשית של האתר.
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

// הסתרת תמונות הקינוחים והצגת תמונות התוספות בחצי שקיפות.
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

// שינוי שקיפות תמונת התוספת בהתאם לבחירה.
function changeAddition(index, checkboxId) {
    let checkbox = document.getElementById(checkboxId);

    if (checkbox.checked) {
        checkboxImages[index].style.opacity = "1";
    } else {
        checkboxImages[index].style.opacity = "0.5";
    }
}

// הפעלת כפתור האישור רק לאחר הזנת שם ובחירת קינוח.
function checkForm() {
    let name = document.getElementById("userName").value.trim();

    document.getElementById("confirmButton").disabled =
        name === "" || selectedRecipe === -1;
}

// עדכון פתק ההזמנה לפי בחירות המשתמש.
function updateOrder() {
    let name = document.getElementById("userName").value.trim();
    let recipeText = document.getElementById("orderRecipe");
    let recipeImage = document.getElementById("orderRecipeImage");

    // הצגת השם בפתק ההזמנה.
    document.querySelector(".name-label").textContent =
        name !== "" ? "שם: " + name : "שם:";

    // הצגת הקינוח שנבחר או הודעה אם עדיין לא נבחר קינוח.
    if (selectedRecipe === -1) {
        recipeText.textContent = "עדיין לא נבחר קינוח";
        recipeImage.hidden = true;
        recipeImage.removeAttribute("src");
    } else {
        recipeText.textContent = recipeNames[selectedRecipe];
        recipeImage.src = recipeFiles[selectedRecipe];
        recipeImage.alt = "תמונה של " + recipeNames[selectedRecipe];
        recipeImage.hidden = false;
    }

    // ניקוי אזור התוספות לפני עדכונו.
    let additionsArea = document.getElementById("orderAdditions");
    additionsArea.textContent = "";

    let anySelected = false;

    // הצגת התמונות והשמות של התוספות שנבחרו בלבד.
    for (let i = 0; i < checkboxIds.length; i++) {
        if (document.getElementById(checkboxIds[i]).checked) {
            anySelected = true;

            let item = document.createElement("div");
            item.className = "order-addition";

            let image = document.createElement("img");
            image.src = additionFiles[i];
            image.alt = "תמונה של " + additionNames[i];

            let caption = document.createElement("span");
            caption.textContent = additionNames[i];

            item.appendChild(image);
            item.appendChild(caption);
            additionsArea.appendChild(item);
        }
    }

    // הודעה כאשר המשתמש לא בחר תוספות.
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

    // איסוף התוספות שנבחרו.
    let selectedAdditions = [];

    for (let i = 0; i < checkboxIds.length; i++) {
        if (document.getElementById(checkboxIds[i]).checked) {
            selectedAdditions.push(additionNames[i]);
        }
    }

    // בניית הודעת האישור.
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

// הפעלת ההגדרות ועדכון הפתק בטעינת האתר.
setInitialImages();
updateOrder();
checkForm();
