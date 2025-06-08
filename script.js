kaboom({
    background: [57, 59, 86]
})

loadFont("poppins", "Poppins-SemiBold.ttf")

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

var lose = false
var letters = {}
var speed = 5
var points = 0

const t = add([
    text("Letter Catch"),
    pos(width() / 2 - 250, height() - 300),
    scale(2)
])

const p = add([
    text("Points: " + points),
    pos(width() / 2 - 190, height() - 200),
    scale(2)
])

alphabet.split("").forEach((i, v) => {
    var letter = add([
        text(i, {
            font: "poppins",
            size: 50
        }),
        pos(70 * v + 70, height() / 2 - 50),
        "letter",
        i
    ])

    letters[i] = {
        x: letter.pos.x,
        y: letter.pos.y
    }
})

loop(1, () => {
    if (!lose) {
        const l = Object.keys(letters)[Math.floor(Math.random() * 26)]

        fl = l

        add([
            text(l, {
                font: "poppins",
                size: 50
            }),
            pos(letters[l].x, 0),
            color(255, 255, 255),
            "fletter",
            "f" + l
        ])
    }
})

onUpdate(() => {
    if (!lose) {
        for (let i of get("fletter")) {
            i.pos.y += speed

            if (i.pos.y > height()) {
                t.text = "You Lose"
                t.pos.x = width() / 2 - 170
                lose = true
            }
        }
    }
})

for (let i of alphabet) {
    onKeyPress(i.toLowerCase(), () => {
        var falling = get("f" + i)[0]
        if (!falling) {
            t.text = "You Lose"
            t.pos.x = width() / 2 - 170
            lose = true
            return
        }

        var basey = letters[i].y
        var diff = Math.abs(falling.pos.y - basey)
        var maxdiff = 100

        var score = Math.max(0, 1 - diff / maxdiff).toFixed(2)

        if (score > 0 && score <= 0.25) {
            t.text = "Not Bad"
            t.pos.x = width() / 2 - 160
            points += 1
        }

        if (score > 0.25 && score <= 0.5) {
            t.text = "Average"
            t.pos.x = width() / 2 - 150
            points += 2
        }

        if (score > 0.5 && score <= 0.75) {
            t.text = "Good"
            t.pos.x = width() / 2 - 100
            points += 3
        }

        if (score > 0.75 && score <= 0.9) {
            t.text = "Excellent"
            t.pos.x = width() / 2 - 180
            points += 4
        }

        if (score > 0.9 && score <= 1) {
            t.text = "Hacker?"
            t.pos.x = width() / 2 - 150
            points += 6
            shake(10)
        }

        if (score == 0) {
            t.text = "You Lose"
            t.pos.x = width() / 2 - 160
            lose = true
        }

        p.text = "Points: " + points
        destroy(falling)
        speed += 0.2
    })
}