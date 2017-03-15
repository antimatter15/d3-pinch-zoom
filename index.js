function PinchZoom(selection){
    var zoom = selection.property("__zoom");
    if(!zoom) throw "selection.call(zoom) should happen before .call(PinchZoom)";

    var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
    if(!isMac) return;

    selection
        .on('wheel.zoom', wheeled)
        .on('gesturechange', gestured)
        .on('gesturestart', gesturestart)
        .on('gestureend', gestured);


    var initialScale = 1;
    function gestured(){
        var e = d3.event;
        zoom.scaleTo(selection, e.scale * initialScale)
        e.preventDefault()
    }

    function gesturestart(){
        initialScale = d3.zoomTransform(selection.node()).k;
        d3.event.preventDefault()
    }

    function wheeled(){
        var e = d3.event;
        e.preventDefault()
        if(e.metaKey || e.ctrlKey){
            zoom.scaleBy(selection, Math.pow(0.98, e.deltaY))
        } else {
            var scale = d3.zoomTransform(selection.node()).k;
            zoom.translateBy(selection, -e.deltaX / scale, -e.deltaY / scale)
        }
    }
}