from django.shortcuts import render
import json
from pprint import pprint
from .models import *
from django.http import HttpResponse

# Create your views here.
def all(request):
    rooms = list(map(lambda r: {"name": r.name, "home": r.home, "guest": r.guest, "yt_src": r.yt_src}, Room.objects.all()))

    response_data = {}
    response_data["rooms"] = rooms
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def create(request):
    name = request.GET.get('name', '')
    home = request.GET.get('home', '')
    guest = request.GET.get('guest', '')
    yt_src = request.GET.get('yt_src', '')
    room = Room(name=name, home=home, guest=guest, yt_src=yt_src)
    room.save();
    return HttpResponse()


def room(request):
    room_name = request.GET.get('name', '')
    room = Room.objects.get(name=room_name)      

    response_data = {}
    response_data["yt_src"] = room.yt_src
    response_data["home"] = room.home
    response_data["guest"] = room.guest
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def chat(request):
    room_name = request.GET.get('room', '')
    room = Room.objects.get(name=room_name)      
    messages = list(map(lambda m: {"name": m.name, "body": m.body}, Message.objects.filter(room=room)))

    response_data = {}
    response_data["messages"] = messages
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def register(request):
    room_name = request.GET.get('name', '')
    pprint(room_name)
    user_name = request.GET.get('user_name', '')
    room = Room.objects.get(name=room_name)      
    watcher = Watcher(room=room, name=user_name)
    watcher.save()
    return HttpResponse()

def unregister(request):
    room_name = request.GET.get('name', '')
    user_name = request.GET.get('user_name', '')
    room = Room.objects.get(name=room_name)      
    watcher = Watcher.objects.get(room=room, name=user_name).delete()
    return HttpResponse()

def watchers(request):
    room_name = request.GET.get('name', '')
    print(room_name)
    room = Room.objects.get(name=room_name)      
    messages = list(map(lambda w: {"name": w.name}, Watcher.objects.filter(room=room)))

    response_data = {}
    response_data["watchers"] = messages
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def bets(request):
    #room_name = request.GET['name']
    room_name = request.GET.get('name', '')
    room = Room.objects.get(name=room_name)      
    bets = list(map(lambda b: {"name": b.name, "value": b.value}, Bet.objects.filter(room=room)))

    response_data = {}
    response_data["bets"] = bets
    return HttpResponse(json.dumps(response_data), content_type="application/json")

def put_bet(request):
    room_name = request.GET.get('room_name', '')
    pprint(room_name)
    name = request.GET.get('name', '')
    value = request.GET.get('value', '')
    room = Room.objects.get(name=room_name)
    bet = Bet(room=room, name=name, value=value)
    bet.save();
    return HttpResponse()

