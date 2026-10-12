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

// הערך ‎-1 מציין שעדיין לא נבחר מאפה.
let selectedRecipe = -1;

// מערכים לשמירת שמות המאפים, שמות התוספות והקבצים המתאימים להם.
// הסדר במערכים תואם לסדר האפשרויות ולמיקומי התמונות ב-HTML.
let recipeNames = ["עוגה", "עוגיות", "מאפה"];
let recipeFiles = ["images/cake.png", "images/cookies.png", "images/pastry.png"];
let additionNames = ["שוקולד", "פירות", "אגוזים", "קצפת"];
let additionFiles = ["images/chocolate.png", "images/fruit.png", "images/nuts.png", "images/cream.png"];
let checkboxIds = ["chocolate", "fruit", "nuts", "cream"];

// הגדרת המראה ההתחלתי: תמונות המאפים מוסתרות ותמונות התוספות חצי שקופות.
function setInitialImages() {
    // עוברים על כל תמונות המאפים ומסתירים אותן עד שהמשתמש יבחר מאפה.
    for (let i = 0; i < radioImages.length; i++) {
        radioImages[i].style.display = "none";
    }

    // התוספות נשארות גלויות, אך בחצי שקיפות עד לבחירה שלהן.
    for (let i = 0; i < checkboxImages.length; i++) {
        checkboxImages[i].style.opacity = "0.5";
    }
}

// הפונקציה מופעלת כשבוחרים מאפה מתוך אפשרויות ה-radio.
function showRecipe(index) {
    // קודם מסתירים את כל תמונות המאפים כדי להציג רק את התמונה שנבחרה.
    for (let i = 0; i < radioImages.length; i++) {
        radioImages[i].style.display = "none";
    }

    // מציגים את התמונה המתאימה ושומרים את מספר המאפה שנבחר.
    radioImages[index].style.display = "block";
    selectedRecipe = index;

    // בודקים אם אפשר לאפשר את כפתור האישור ומעדכנים את פתק ההזמנה.
    checkForm();
    updateOrder();
}

// הפונקציה משנה את שקיפות תמונת התוספת בהתאם למצב תיבת הסימון שלה.
function changeAddition(index, checkboxId) {
    let checkbox = document.getElementById(checkboxId);

    if (checkbox.checked) {
        // אם התוספת נבחרה, התמונה מוצגת באופן ברור.
        checkboxImages[index].style.opacity = "1";
    } else {
        // אם הבחירה בוטלה, התמונה חוזרת לחצי שקיפות.
        checkboxImages[index].style.opacity = "0.5";
    }
}

// כפתור האישור פעיל רק כאשר הוזן שם ונבחר מאפה.
function checkForm() {
    let name = document.getElementById("userName").value.trim();
    document.getElementById("confirmButton").disabled = name === "" || selectedRecipe === -1;
}

// עדכון פתק ההזמנה בצד שמאל לפי הבחירות הנוכחיות של המשתמש.
function updateOrder() {
    let name = document.getElementById("userName").value.trim();
    let recipeText = document.getElementById("orderRecipe");
    let recipeImage = document.getElementById("orderRecipeImage");

    // מציגים את השם בפתק, ואם השדה ריק משאירים רק את הכותרת.
    if (name !== "") {
        document.querySelector(".name-label").textContent = "שם: " + name;
    } else {
        document.querySelector(".name-label").textContent = "שם:";
    }

    // אם עדיין לא נבחר קינוח, מציגים הודעה ומסתירים את התמונה.
    if (selectedRecipe === -1) {
        recipeText.textContent = "עדיין לא נבחר קינוח";
        recipeImage.hidden = true;
    } else {
        // מעדכנים את שם המאפה ואת התמונה שלו לפי הבחירה.
        recipeText.textContent = recipeNames[selectedRecipe];
        recipeImage.src = recipeFiles[selectedRecipe];
        recipeImage.alt = recipeNames[selectedRecipe];
        recipeImage.hidden = false;
    }

    // מנקים את אזור התוספות כדי לבנות אותו מחדש לפי הבחירות העדכניות.
    let additionsArea = document.getElementById("orderAdditions");
    additionsArea.textContent = "";
    let anySelected = false;

    // עוברים על כל התוספות ובודקים אילו תיבות סימון מסומנות.
    for (let i = 0; i < checkboxIds.length; i++) {
        if (document.getElementById(checkboxIds[i]).checked) {
            anySelected = true;

            // יוצרים אזור קטן לתוספת שנבחרה.
            let item = document.createElement("div");
            item.className = "order-addition";

            // מוסיפים לאזור את תמונת התוספת ואת שמה.
            let image = document.createElement("img");
            image.src = additionFiles[i];
            image.alt = additionNames[i];

            let caption = document.createElement("span");
            caption.textContent = additionNames[i];

            item.appendChild(image);
            item.appendChild(caption);
            additionsArea.appendChild(item);
        }
    }

    // אם לא נבחרו תוספות, מציגים הודעה מתאימה בפתק ההזמנה.
    if (!anySelected) {
        let empty = document.createElement("span");
        empty.className = "empty-note";
        empty.textContent = "התוספות שבחרתם יופיעו כאן";
        additionsArea.appendChild(empty);
    }
}

// הפונקציה מופעלת בלחיצה על כפתור אישור ההזמנה.
function confirmForm() {
    let name = document.getElementById("userName").value.trim();

    // בדיקה נוספת כדי למנוע אישור אם חסר שם או שלא נבחר מאפה.
    if (name === "" || selectedRecipe === -1) {
        checkForm();
        return;
    }

    // אוספים למערך את שמות התוספות שנבחרו.
    let selectedAdditions = [];
    for (let i = 0; i < checkboxIds.length; i++) {
        if (document.getElementById(checkboxIds[i]).checked) {
            selectedAdditions.push(additionNames[i]);
        }
    }

    // בונים הודעת אישור הכוללת את השם, המאפה והתוספות.
    let message = "שלום " + name + "! בחרתם: " + recipeNames[selectedRecipe] + ". ";
    if (selectedAdditions.length === 0) {
        message += "לא בחרתם תוספות.";
    } else {
        message += "התוספות שבחרתם: " + selectedAdditions.join(", ") + ".";
    }

    // מציגים את ההודעה בחלונית האישור.
    document.getElementById("confirmationText").textContent = message;
    document.getElementById("confirmationPopup").style.display = "flex";
}

// סגירת חלונית האישור.
function closePopup() {
    document.getElementById("confirmationPopup").style.display = "none";
}

// הפעלת הגדרות הפתיחה ועדכון פתק ההזמנה בעת טעינת הדף.
setInitialImages();
updateOrder();
