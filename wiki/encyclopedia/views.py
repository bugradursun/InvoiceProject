from django.shortcuts import render

from . import util

#views.py'da primarily functions are held. These functions accept a request object, do something with
#some data and return a Http response. How do we call these functions?
#we are tying the URLs to them. => mapping of URLs to functions are in urls.py

def index(request):
    return render(request, "encyclopedia/index.html", {
        "entries": util.list_entries()
    })
def page(request,entry):
    content = util.get_entry(entry)
    if content == None : 
        return render(request,"encyclopedia/result.html",{
            "message" : "404 - Page Not Found"
        })
    

