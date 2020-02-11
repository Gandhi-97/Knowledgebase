function getfile(file) {
    var data;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        file = rawFile.response;
        data = JSON.parse(file);
        return data;
    }
    rawFile.send(null);
    return data;
}

function openDialog() {
    document.getElementById("myForm").style.display = "block";
}

function closechat() {
    document.getElementById("myForm").style.display = "none";
}

function autocomplete(inp, arr) {
    var currentFocus;
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i]['title'].substr(0, val.length).toUpperCase() == val.toUpperCase() || arr[i]['content'].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement("DIV");
                if (arr[i]['title'].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                    b.innerHTML = "<strong>" + arr[i]['title'].substr(0, val.length) + "</strong>";
                    b.innerHTML += arr[i]['title'].substr(val.length);
                }
                else {
                    b.innerHTML += arr[i]['title'];
                }
                b.innerHTML += `<a class="autocomplete-link" href="/tags/#${arr[i]['tag']}"><span class=autocomplete-tag>${arr[i]['tag']}</span></a>`;
                b.innerHTML += "<input type='hidden' value='" + arr[i]['title'] + "'>";
                b.addEventListener("click", function (e) {
                    inp.value = this.getElementsByTagName("input")[0].value;
                    var category;
                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j].title == inp.value) {
                            category = arr[j]['url'];
                        }
                    }
                    window.location = window.location.protocol + "//" + window.location.host + "/" + category.slice(1, category.length);
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}

if (window.location.pathname == "/categories/") {
    window.onload = url;
}

function url() {
    var url_string = window.location.href;
    var url_format = new URL(url_string);
    var category = url_format.searchParams.get("category");
    categoryView = document.getElementById("categoryView");
    getCategory = this.getfile("http://localhost:4006/categoryDetails.json");
    fullCategory = getCategory['KnowledgeBase'];
    getPost = this.getfile("http://localhost:4006/posts.json");
    categoryView.innerHTML = `<h5 class="category">${category}</h5>`;
    for (var i = 0; i < fullCategory.length; i++) {
        if (fullCategory[i].path == category) {
            if (fullCategory[i].subPath) {
                for (var j = 0; j < fullCategory[i].subPath.length; j++) {
                    categoryView.innerHTML += `<h5 class="subcategory">${fullCategory[i].subPath[j]}</h5>`;
                    for (var k = 0; k < getPost.length; k++) {
                        if (getPost[k]['main'] == category && getPost[k]['subPath'] == fullCategory[i].subPath[j]) {
                            articleList(getPost[k]);
                        }
                    }
                }
            }
            else {
                for (var k = 0; k < getPost.length; k++) {
                    if (getPost[k]['main'] == category)
                        articleList(getPost[k]);
                }
            }
        }
    }
}

function articleList(post) {
    return categoryView.innerHTML += `<div><div class="articlelist" style="line-height: 28.4375px ;font-size: 17px;font-weight: 200;"><a href="${post.url}" class="link_style">${post.title}</a><div class="hideafter3line" style="font-size: 15px">${post.description ? post.description : ''}</div></div></div>`;
}

autocomplete(document.getElementById("search"), this.getfile("http://localhost:4006/posts.json"));