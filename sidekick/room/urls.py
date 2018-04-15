from django.urls import path

from . import views

urlpatterns = [
    path('', views.room, name='room'),
    path('chat', views.chat, name='chat'),
    path('watchers', views.watchers, name='watchers'),
    path('bets', views.bets),
    path('put_bet', views.put_bet),
]
