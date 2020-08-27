var oldWidth = 0
var svg = 0
let node
var x = 0
var y = 0
var colors = 0
var partition = 0
var arc = 0
var radius = 0

///////
function getURL() {
    return window.location.origin;
}

/////
function _find(collection, key) {
    for (let kys of Object.keys(collection)) {
        var o = collection[kys];
        // console.log('---------')
        // console.log(kys,o)
        // console.log('---------')
        if (kys == 'children') {
            for (const [k, v] of Object.entries(o)) {
                if (v['name'] === key) {
                    return v
                }
                if (Array.isArray(v['children'])) {
                    const _o = _find(v, key)
                    if (_o) {
                        return _o
                    }
                }
            }
        }
        if (kys == key) {
            return collection[key]
        }
    }
}

//////
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

///
function getFileJSON(file) {
    var origin = window.location.origin;
    if (origin.includes("webflow") ){
     var origin = "https://afternoon-earth-08431.herokuapp.com"
    }
    var text = readTextFile(origin + "/static/resources/js/" + file)
    var data = ''
    if (text == null) {
        data = {features: []}
    } else {
        data = JSON.parse(text);
    }
    return data
}

////////
function setSvg(svgn, radiusn) {
    svg = svgn
    x = d3.scaleLinear().range([0, 2 * Math.PI])
    radius = radiusn
    y = d3.scaleLinear().range([0, radius])
    colors = d3.scaleOrdinal(d3.schemeCategory20)
    partition = d3.partition()
    arc = d3.arc()
        .startAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x0))))
        .endAngle(d => Math.max(0, Math.min(2 * Math.PI, x(d.x1))))
        .innerRadius(d => Math.max(0, y(d.y0)))
        .outerRadius(d => Math.max(0, y(d.y1)))
}

///////
function sunburst(flag = 0) {
   // d3.json(getURL() + "/static/resources/js/" + "flare.json", function (error, root) {
       // if (error) return console.error(error)
        var root = getd(flag)

        const gSlices = svg.selectAll('g').data(partition(d3.hierarchy(root).sum(d => d.size)).descendants(), function (d) {
            return d.data.id
        }).enter().append('g')

        gSlices.exit().remove()

        gSlices.append('path')
            .style('fill', function (d) {
                if (d.depth === 0) return 'white'
                return colors(d.x0)
            })
            //.on('click', click) // stop on click to on scroll abed

        gSlices.append('text')
            .attr('dy', '.35em')
            .text(function (d) {
                return d.parent ? d.data.name : ''
            })
            .attr('id', function (d) {
                return 'w' + d.data.name
            })
            .attr('fill', '#fff')

        svg.selectAll('path')
            .transition('update')
            .duration(750).attrTween('d', function (d, i) {
            return arcTweenPath(d, i)
        })

        svg.selectAll('text')
            .transition('update')
            .duration(750)
            .attrTween('transform', function (d, i) {
                return arcTweenText(d, i)
            })
            .attr('text-anchor', function (d) {
                return d.textAngle > 180 ? 'start' : 'end'
            })
            .attr('dx', function (d) {
                return d.textAngle > 180 ? 27 : 27
            })
            .attr('opacity', function (e) {
                return e.x1 - e.x0 > 0.01 ? 1 : 0
            })

    //})
}

/////
function arcTweenText(a, i) {
    var oi = d3.interpolate({
        x0: (a.x0s ? a.x0s : 0),
        x1: (a.x1s ? a.x1s : 0),
        y0: (a.y0s ? a.y0s : 0),
        y1: (a.y1s ? a.y1s : 0)
    }, a)

    function tween(t) {
        var b = oi(t)
        var ang = ((x((b.x0 + b.x1) / 2) - Math.PI / 2) / Math.PI * 180)

        b.textAngle = (ang > 90) ? 180 + ang : ang
        a.centroid = arc.centroid(b)

        return 'translate(' + arc.centroid(b) + ')rotate(' + b.textAngle + ')'
    }

    return tween
}

///
function arcTweenPath(a, i) {
    var oi = d3.interpolate({
        x0: (a.x0s ? a.x0s : 0),
        x1: (a.x1s ? a.x1s : 0),
        y0: (a.y0s ? a.y0s : 0),
        y1: (a.y1s ? a.y1s : 0)
    }, a)

    function tween(t) {
        var b = oi(t)

        a.x0s = b.x0
        a.x1s = b.x1
        a.y0s = b.y0
        a.y1s = b.y1

        return arc(b)
    }

    if (i == 0 && node) {

        var xd = d3.interpolate(x.domain(), [node.x0, node.x1])
        var yd = d3.interpolate(y.domain(), [node.y0, 1])
        var yr = d3.interpolate(y.range(), [node.y0 ? 40 : 0, radius])

        return function (t) {
            x.domain(xd(t))
            y.domain(yd(t)).range(yr(t))

            return tween(t)
        }
    } else {
        // first build
        return tween
    }
}

//
function click(d) {
    node = d
    const total = d.x1 - d.x0

    svg.selectAll('path')
        .transition('click')
        .duration(750)
        .attrTween('d', function (d, i) {
            return arcTweenPath(d, i)
        })

    svg.selectAll('text')
        .transition('click')
        .attr('opacity', 1)
        .duration(750)
        .attrTween('transform', function (d, i) {
            return arcTweenText(d)
        })
        .attr('text-anchor', function (d) {
            return d.textAngle > 180 ? 'start' : 'end'
        })
        .attr('dx', function (d) {
            if (d.data.name.length > 3) {
                return d.textAngle > 180 ? -23 : 23
            }
            return d.textAngle > 180 ? -13 : 13
        })
        .attr('opacity', function (e) {
            // hide & show text
            if (e.x0 >= d.x0 && e.x1 <= (d.x1 + 0.0000000000000001)) {
                const arcText = d3.select(this.parentNode).select('text')
                arcText.attr('visibility', function (d) {
                    return (d.x1 - d.x0) / total < 0.01 ? 'hidden' : 'visible'
                })
            } else {
                return 0
            }
        })
}

/////
function getd(flag) {
    //var all_data = getFileJSON('flare.json')
    //data = all_data['data' + flag]
    // console.log(all_data)
    if (flag == 0) {
        return all_data
    }
    else if (flag == 1) {
        return _find(all_data, "Palestine")
    }
    else if (flag == 2) {
        return _find(all_data, "Gaza")
    }
    else {
        return _find(all_data, "Gaza city")
    }
}

/////
function update(flag) {
    var d = getd(flag)
      d3.select("#rect").selectAll("path").remove();
      d3.select("#rect").selectAll("text").remove();
      sunburst(flag)
}


