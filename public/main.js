function focVisible(){
    var foc = document.getElementById("foc");
    foc.style.display="block";

    var fmc = document.getElementById("fmc");
    fmc.style.display="none";

    var gcf = document.getElementById("gcf");
    gcf.style.display="none";

    var focnav = document.getElementById("focnav");
    focnav.style.fontWeight="bolder";

    var gcfnav = document.getElementById("gcfnav");
    gcfnav.style.fontWeight="normal";

    var fmcnav = document.getElementById("fmcnav");
    fmcnav.style.fontWeight="normal";
}

function fmcVisible(){
    var fmc = document.getElementById("fmc");
    fmc.style.display="block";

    var foc = document.getElementById("foc");
    foc.style.display="none";

    var gcf = document.getElementById("gcf");
    gcf.style.display="none";

    var fmcnav = document.getElementById("fmcnav");
    fmcnav.style.fontWeight="bolder";

    var focnav = document.getElementById("focnav");
    focnav.style.fontWeight="normal";

    var gcfnav = document.getElementById("gcfnav");
    gcfnav.style.fontWeight="normal";
}

function gcfVisible(){
    var gcf = document.getElementById("gcf");
    gcf.style.display="block";

    var foc = document.getElementById("foc");
    foc.style.display="none";

    var fmc = document.getElementById("fmc");
    fmc.style.display="none";

    var gcfnav = document.getElementById("gcfnav");
    gcfnav.style.fontWeight="bolder";

    var fmcnav = document.getElementById("fmcnav");
    fmcnav.style.fontWeight="normal";

    var focnav = document.getElementById("focnav");
    focnav.style.fontWeight="normal";
}

function flipOneCoin() {
    document.getElementById("spanLoading").style.display="flex"
    document.getElementById("spanLoading").style.justifyContent="center"
    document.getElementById("spanLoading").style.marginTop="10px"
    document.getElementById("spanLoading").style.marginBottom="10px"
    document.getElementById("focresimg").src="assets/img/coin.png";
    fetch("http://localhost:5555/app/flip/",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        }
    )
        .then(res => res.json())
        .then(data => {
            const result = data.flip.toString()
            return setTimeout(() => {
                document.getElementById("spanLoading").style.display="none"
                document.getElementById("focresimg").src="assets/img/"+result+".png";
                document.getElementById("focres").innerHTML = "Result: " + result + "!"
                document.getElementById("focres").style.marginTop="10px"
            }, 1000);
        })
}

function flipMultipleCoins(number) {
    document.getElementById("spanLoading2").style.display="flex"
    document.getElementById("spanLoading2").style.justifyContent="center"
    document.getElementById("spanLoading2").style.marginTop="10px"
    document.getElementById("spanLoading2").style.marginBottom="10px"

    number = Number(number)
    if (!Number.isInteger(number)) {
        alert("Error! Invalid Input!")
        return
    }
    else {
        number = parseInt(number, 10)
    }
    fetch("http://localhost:5555/app/flips/"+number,
        {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                number: number
            })
        })
        .then(res => res.json())
        .then(data => {
            const result = data.raw
            const summary = data.summary
            
            setTimeout(() => {
                let table = document.getElementById("displayTable");
                const total = parseInt(summary.tails) + parseInt(summary.heads)
                for (let i = 1; i <= total; i++) {
                    fmcVisible()
                    var row = table.insertRow(1);
                    cell1 = row.insertCell(0)
                    cell2 = row.insertCell(1)
                    cell1.innerHTML = total - i + 1
                    cell2.innerHTML = result[total - i]
                }
                document.getElementById("spanLoading2").style.display="none"
                return fmcVisible()
            }, 1500)
            
        })
}

// Guess a flip by clicking either heads or tails button
function guessFlip(guess) {
    guess = guess.toString()
    document.getElementById("guessRes").innerHTML = "Flipping..."
    document.getElementById("guessResImg").src="assets/img/coin.png";
    document.getElementById("guessVal").innerHTML = "Your guess: "+guess
    document.getElementById("guessValImg").src="assets/img/"+guess+".png";
    fetch("http://localhost:5555/app/flip/call/"+guess,
        {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                    call : guess
            }) 
        }
    )
        .then(res => res.json())
        .then(data => {
            const result = data.flip.toString()
            const winOrLoss = data.result.toString()
            let winStatement = ""
            if (winOrLoss === "win") {
                winStatement = "You Won! Congratulations!"
            }
            else if (winOrLoss === "lose") {
                winStatement = "You lost! Not so Lucky :("
            }
            else {
                alert("Error!")
            }
            document.getElementById("guessResImg").src="assets/img/"+result+".png";
            document.getElementById("guessRes").innerHTML = "Result: " + result
            document.getElementById("winStatement").innerHTML = winStatement
        })
}