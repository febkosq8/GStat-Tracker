const onInit = () => {
	var hash = window.location.hash;
	if (!hash) hash = "#home";
	handleRouting(hash);
};
const handleRouting = (hash) => {
	var current = hash.split("#")[1];
	removeActive();
	loadData(current).then((data) => {
		document.getElementById("content").innerHTML = data;
		newActive(hash);
	});
};
const loadData = async (filename) => {
	return await fetch(`pages/${filename}.html`).then((result) => {
		return result.text();
	});
};
const removeActive = () => {
	document
		.querySelector(".navbar-items")
		.getElementsByClassName("active")[0]
		.removeAttribute("class");
};
const newActive = (hash) => {
	var items = document.querySelector(".navbar-items").children;
	for (const child of items) {
		if (child.hash === hash) {
			child.setAttribute("class", "active");
		}
	}
};
const navChange = (event) => {
	var hash = event.path[0].hash;
	if (!hash) hash = "#home";
	handleRouting(hash);
};

const handleSubmit = (event) => {
	console.log(event);
};
