from django.urls import path

from . import views

urlpatterns = [
    path('', views.room, name='room'),
    path('create', views.create, name='create'),
    path('all', views.all, name='all'),
    path('chat', views.chat, name='chat'),
    path('register', views.register, name='register'),
    path('unregister', views.unregister, name='unregister'),
    path('watchers', views.watchers, name='watchers'),
    path('bets', views.bets),
    path('put_bet', views.put_bet),
]
