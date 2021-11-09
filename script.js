/* Messy Javascript code */
let score = 0
let questions_amount = 0
let current_id = "intro";

/* The amount of options a question has */
let options = 0;

/* Advance to the next div (manages deletation and visibilty toggling of divs) */
function advance(question_id, answers)
{
    document.getElementById(current_id).remove()
    document.getElementById(question_id).style.visibility = "visible"

    current_id = question_id
    document.title = "question #" + question_id[1]

    options = answers;
}

/* Toggle the results and advance to the result div */
function results()
{
    advance("results", 0);

    document.getElementById("result").innerHTML = `You are ${((score / questions_amount)).toFixed(0)}% unique!`
    console.log(score);
    document.title = "results"
}

/** 
 * Iterates through the arguments elements and checks the data given
 * The function presumes that the data in the argument is an array of arrays
 * Those arrays then hold three elements as follows, presented in order:
 *      The ID of the radio element
 *      The amount of points to deduct or add (ranging from 1 to 100)
 *      The operation to perform (either '+' or '-')
*/
function res(data)
{
    questions_amount++;
    for (i in data)
    {
        if (document.getElementById(data[i][0]).checked == true)
        {
            if (data[i][2] == '+')
            {
                score += 100 - data[i][1];
                console.log("Score: " + score + " (+" + data[i][1] + ")");
            }
            else
            {
                score -= 100 + data[i][1];
                if (score < 0) score = 0;

                console.log("Score: " + score + " (-" + data[i][1] + ")");
            }
            break;
        }
    }
}

/* Listen for keys being pressed */
document.addEventListener("keypress", function(event) {

    // If the enter key is pressed, click the button on the screen and advance to the next div
    if (event.key == "Enter" && current_id != "results")
    {
        document.getElementById(`button_${current_id}`).click();
    } else {
        // Iterate through the options and check if the number had been pressed. if so, select that question
        if (current_id != "intro" && current_id != "results") {
            for (let i = 0; i != options + 1; i++)
            {
                if (event.key == i.toString())
                {
                    document.getElementById(i.toString()).checked = true;
                }
            }
        }
        else if (current_id == "results" && event.key == "p")
        {
            window.location.href = "refs.html";
        }
        else if (current_id == "intro" && event.key == "s")
        {
            document.getElementById("src").click();
        }
    }
})

console.log("Controls:\n\t* \"Enter\" to control buttons\n\t* Number keys to select choices\n\nView the source code:\nhttps://github.com/phoebe-leong/uniqueness-test")