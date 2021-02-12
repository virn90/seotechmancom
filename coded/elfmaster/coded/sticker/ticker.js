var entries; var feed;
var feed_url = blog_url.match(/\/$/) ? blog_url : blog_url+"/";
feed_url += "feeds/posts/default";
function recent_breaking_createEntries(){
    var entries = feed.entry;
    var entriesArr = [];
    for(var i=0; i<latest_post; i++){
        var entry = entries[i];
        var entryObj = new Object();
        entryObj.title = entry.title.$t;
        entryObj.href  = getHref(entry.link);
        entriesArr.push(entryObj);
    }
    return entriesArr;
}
function getBlogTitle(){
    return feed.title.$t;
}
function  getBlogURL(){
    return getHref(feed.link);
}
function getHref(links){
    for(var i=0; i<links.length; i++){
        var link = links[i];
        if(link.rel == "alternate"){return link.href;}
    }
    return null;
}
function recent_breaking_start(json){
    feed = json.feed;
    entries = recent_breaking_createEntries();
    recent_breaking_style();
    recent_breaking_content();
}
function recent_breaking_text(){
    var src = feed_url+"?alt=json-in-script&callback=recent_breaking_start&max-results="+latest_post;
    var s = "<script src='"+src+"'></script>";
    document.write(s);
}
function recent_breaking_style(){
    var s = "<style type='text/css'>";
    s += "#recent_breaking{";
    s += "margin:0px;";
    s += "width:auto;";
    s += "background:#fff;";
    s += "}";
    s += "</style>";
    document.write(s);
}
function recent_breaking_content(){
    var s = "<div id='recent_breaking' title='Breaking News'>";
    if(info_text){
    s += "<div class='wrapper'>";
    s += "<div class='newstitle'>";
    s += "Breaking News";
    s += "</div>";
    }
    s += "  <marquee style='float:left; margin-left:10px; width:82%' scrollAmount='"+scrolling_speed+"'>";
    for(var i=0; i<latest_post; i++){
        var recent_breaking_entries = entries[i];
        s += "<a href='"+recent_breaking_entries.href+"' ";
        s += "onmouseover='this.parentNode.stop()' onmouseout='this.parentNode.start()'";
        s += ">" + recent_breaking_entries.title + "</a>";
        if(i != latest_post-1){s += " | ";}
    }
    s += "</marquee>";
    s += "</div>";
    if(close_button){
	s += "<div style='float:right;margin-right:15px;'>";
    s += "<a href='javascript:void(0)' onclick='document.getElementById(\"recent_breaking\").style.display=\"none\"'>";
    s += "(x)";
    s += "</a>";
    s += "</div>";
    }
    document.write(s);
}
recent_breaking_text();
