var margin = {top: 30, right: 30, bottom: 70, left: 60},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page

var svg = d3.select('#graph').html('')
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attrs({id: 'rect', class: 'rectsvg', style: 'position: absolute' + ';top:' + 0 + 'px'})
    .append("g") // there is a problem with G
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Initialize the X axis
var x = d3.scaleBand()
    .range([0, width])
    .padding(0.2);
var xAxis = svg.append("g")
    .attr("transform", "translate(0," + height + ")")
// Initialize the Y axis
var y = d3.scaleLinear()
    .range([height, 0]);
var yAxis = svg.append("g")
    .attr("class", "myYaxis")

// Define the div for the tooltip
// var tip = d3.tip()
//     .offset([-10, 0])
//     .attr('class', 'tooltip')
//     .attr('id', 'tooltip')
//     .html(function (d) {
//         console.log('about to show the tooltip')
//         console.log(d)
//         return "<strong>Group:</strong> <span style='color:red'>" + d.group + "</span>" + "<br>"
//             + "<strong>Value:</strong> <span style='color:red'>" + d.value + "</span>";
//     })
// svg.call(tip);


function getURL() {
    return window.location.host;
}

function readTextFile(file) {
    var rawFile = new XMLHttpRequest();
    var allText; // var declared in readTextFile scope
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                allText = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return allText; // here you can return the data filled in above
}

function getFileJSON(file) {
    var text = readTextFile('http://' + getURL() + "/static/resources/js/" + file)
    var data = ''
    if (text == null) {
        data = {features: []}
    } else {
        data = JSON.parse(text);
    }
    return data
}

// A function that create / update the plot for a given variable:
function update(flag) {
    var all_data = getFileJSON('scroll_data.json')
    data = all_data['data' + flag]

    // Update the X axis
    x.domain(data.map(function (d) {
        return d.group;
    }))
    xAxis.call(d3.axisBottom(x))

    // Update the Y axis
    y.domain([0, d3.max(data, function (d) {
        return d.value
    })]);
    yAxis.transition().duration(1000).call(d3.axisLeft(y));

    // Create the u variable
    var u = svg.selectAll("rect")
        .data(data)
        .enter().append("rect")
        .attr("x", function (d) {
            return x(d.group);
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .attr("fill", "#69b3a2")
        .on("mouseover", function (d) {
            // show the tooltip
            var x = d3.event.x,
                y = d3.event.y;
            // tip.direction('n')
            //             // tip.show(d,this);
            console.log(y, x)
            console.log('mouse hover')
        })
        .on("mouseout", function (d) {
            //tip.hide();
            console.log('mouse hide')
        })

    u
        .enter()
        .append("rect") // Add a new rect for each new elements
        .merge(u) // get the already existing elements as well
        .transition() // and apply changes to all of them
        .duration(1000)
        .attr("x", function (d) {
            return x(d.group);
        })
        .attr("y", function (d) {
            return y(d.value);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
            return height - y(d.value);
        })
        .attr("fill", "#69b3a2")

    // If less group in the new dataset, I delete the ones not in use anymore
    u
        .exit()
        .remove()
}


update(0)