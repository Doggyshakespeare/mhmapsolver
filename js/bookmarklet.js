/* eslint no-unused-labels: 0 */
javascript:void(function(){
    var url = 'http://olf.github.io/mhmapsolver/';

    var list = document.querySelectorAll('.treasureMapPopup-mice-groups.uncaughtmice .treasureMapPopup-mice-group-mouse-name span');
    var mice = [];

    for (var i=0; i<list.length; i++) {
        mice.push(list[i].textContent);
    }

    if (mice.length > 0) {
        window.open(url + '?mice=' + encodeURI(mice.join('/')), 'mhmapsolver');
    }
})();
