<?php

//file_put_contents('/var/www/my_logs/cbc.log', 'top of file   ', FILE_APPEND);
    
$type = $_GET['type'];

file_put_contents('/var/www/my_logs/script.log', 'in script anmd type is '.$type);

    
if($type=='news'){
    
    $xml = file_get_contents('http://pearse.schoolspace.ie/index.php?option=com_ninjarsssyndicator&feed_id=1&format=raw');    

}
elseif ($type=='service') { 
    
    $xml = file_get_contents('http://mallowcollege.ie/index.php?option=com_ninjarsssyndicator&feed_id=6&format=raw');

    
 //https://www.google.com/calendar/feeds/mountmercycollegecork@gmail.com/public/full?orderby=starttime&sortorder=ascending&max-results=3&futureevents=true&alt=json
    
}
elseif ($type=='facilities') { 
    
    $xml = file_get_contents('http://mallowcollege.ie/index.php?option=com_ninjarsssyndicator&feed_id=8&format=raw');

    
 //https://www.google.com/calendar/feeds/mountmercycollegecork@gmail.com/public/full?orderby=starttime&sortorder=ascending&max-results=3&futureevents=true&alt=json
    
}
elseif($type=="information"){

    //service
    //http://mallowcollege.ie/index.php?option=com_ninjarsssyndicator&feed_id=6&format=raw
    
        $xml = file_get_contents('http://www.mallowcollege.ie/index.php?option=com_ninjarsssyndicator&feed_id=14&format=raw');
    
}
elseif($type=="daycourse"){

    //service
    //http://mallowcollege.ie/index.php?option=com_ninjarsssyndicator&feed_id=6&format=raw
    
        $xml = file_get_contents('http://www.mallowcollege.ie/index.php?option=com_ninjarsssyndicator&feed_id=13&format=raw');
    
}
elseif($type=="nightcourse"){

    //service
    //http://mallowcollege.ie/index.php?option=com_ninjarsssyndicator&feed_id=6&format=raw
    
        $xml = file_get_contents('http://www.mallowcollege.ie/index.php?option=com_ninjarsssyndicator&feed_id=12&format=raw');
    
}
elseif($type=="welcome"){
    
    //http://www.mallowcollege.ie/index.php?option=com_ninjarsssyndicator&feed_id=15&format=raw
    $xml = file_get_contents('http://www.mallowcollege.ie/index.php?option=com_ninjarsssyndicator&feed_id=15&format=raw');
    
}
elseif($type=="calendar"){
    //https://www.google.com/calendar/feeds/mallowcollegefe@gmail.com/public/full?orderby=starttime&sortorder=ascending&max-results=10&futureevents=true
 
    $xml = file_get_contents('https://www.google.com/calendar/feeds/pearse.college12@gmail.com/public/full?orderby=starttime&sortorder=ascending&max-results=10&futureevents=true');

}
elseif($type=="albums"){
    
   
    
    $link = "http://api.flickr.com/services/rest/?";
    $link .= "&method=flickr.photosets.getList";
    $link .= "&api_key=0ca57413706b5500f54f134b27f0c5c9";
    $link .= "&user_id=95277676@N06";
    
     file_put_contents('/var/www/my_logs/link.log', 'link is '.$link);
    
    $xml = file_get_contents($link);
    
}
elseif($type=="photos"){
    
    $photoset_id = $_GET['photoset_id'];
    
    $link = 'http://api.flickr.com/services/rest/?';
    $link .= '&method=flickr.photosets.getPhotos';
    $link .= '&api_key=0ca57413706b5500f54f134b27f0c5c9&user_id=95277676@N06';
    $link .= "&extras=url_sq,url_t,url_s,url_m,url_o";
    $link .= "&photoset_id=".$photoset_id;
    
    
    $xml = file_get_contents($link);
    
}


echo $xml;

