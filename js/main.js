var need_hightlight = true;
var word_count = 3;
var time_len = 500;

var g_array = [];
var timer;
var time_step = 50;
var current_word = 0;
var highlight_pos = 0;

function init_data() {
	var source = document.getElementById('source');
	var target = document.getElementById('target');
	text = source.innerHTML;
	text = text.replace(/\n/g, "<br/>");
	text = text.replace(/  /g, "&nbsp;");
	g_array = text.split(new RegExp("\\s+"));
	target.innerHTML = text;
}
function start() {
	timer = setInterval(show_words, time_len);
	show_speed();
}
function pause() {
	clearInterval(timer);
}
function restart(time_n, word_n) {
	show_words();
	pause();
	time_len = parseInt(time_n);
	word_count = parseInt(word_n);
	start();
}
function show_words() {
	var board = document.getElementById('board');
	var result = "";
	
	for (var x = 0; x < word_count; x++) {
		result += g_array[current_word].replace('<br/>', ' ') + " ";
		current_word++;
	}
	board.innerHTML = result;
	if (current_word > g_array.length) {
		pause();
	}
	
	if (need_hightlight) {
		highlight_target2(result);
	}
}
function toogle_highlight(value) {
	need_hightlight = value;
	//highlight_target2(); // to turn off highlight in text
}
function highlight_target2(text) {
	//console.log('"' + text + '"');
	text = text.replace(/<br\/>/g, '  ');
	text = text.replace(/  /g, ' ');
	text = text.replace(/  /g, ' ');
	text = text.replace(/ /g, ' ');
	text = text.replace(/&nbsp;/g, ' ');
	text = text.ltrim();
	setSelectionRange(document.getElementById('target'), highlight_pos, highlight_pos + text.length);
	highlight_pos += text.length;
	//console.log('"' + text + '"' + ' — ' + highlight_pos.toString() + ' — ' + text.length.toString());
}
function highlight_target() {
	var target = document.getElementById('target');
	var temp_arr = g_array.slice(0);
	if (need_hightlight) {
		var mark_start = '<div style="background: #FFFF00; display: inline;">';
		var mark_end = '</div>';
		temp_arr[current_word-1] = mark_start + temp_arr[current_word-1];
		temp_arr[current_word + word_count-1] = mark_end + temp_arr[current_word + word_count-1];
	}
	target.innerHTML = temp_arr.join(' ');
}
function show_speed() {
	var curr_speed = document.getElementById('curr_speed');
	curr_speed.value = time_len;
	var count_word = document.getElementById('count_word');
	count_word.value = word_count;
}

window.onload = function() {
	init_data();
}
String.prototype.ltrim = function() {
	return this.replace(/^\s/,"");
}