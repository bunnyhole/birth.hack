from django.shortcuts import render
import json
from pprint import pprint
from .models import *
from django.http import HttpResponse

# Create your views here.
def room(request):
    room_name = request.GET['name']
    room = Room.objects.get(name=room_name)      

    response_data = {}
    response_data["yt_src"] = room.yt_src
    response_data["home"] = room.home
    response_data["guest"] = room.guest
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def chat(request):
    room_name = request.GET['name']
    room = Room.objects.get(name=room_name)      
    messages = list(map(lambda m: {"name": m.name, "body": m.body}, Message.objects.filter(room=room)))

    response_data = {}
    response_data["messages"] = messages
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def watchers(request):
    room_name = request.GET['name']
    room = Room.objects.get(name=room_name)      
    messages = list(map(lambda w: {"name": w.name}, Watcher.objects.filter(room=room)))

    response_data = {}
    response_data["watchers"] = messages
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def bets(request):
    room_name = request.GET['name']
    room = Room.objects.get(name=room_name)      
    bets = list(map(lambda b: {"name": b.name, "value": b.value}, Bet.objects.filter(room=room)))

    response_data = {}
    response_data["bets"] = bets
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def put_bet(request):
    room_name = request.GET['room_name']
    room = Room.objects.get(name=room_name)
    bet = Bet(room=room, name=request.GET['name'], value=request.GET['value'])
    bet.save();
    return HttpResponse()

