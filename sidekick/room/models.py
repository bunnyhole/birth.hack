from django.db import models
from django.utils import timezone

class Room(models.Model):
    name = models.CharField(max_length=200)
    home = models.CharField(max_length=200)
    home_amount = models.FloatField(default="0")
    guest_amount = models.FloatField(default="0")
    guest = models.CharField(max_length=200)
    yt_src = models.CharField(max_length=200)
    time_created = models.DateTimeField(auto_now=True)

    def is_finished(self):
        return timezone.now > self.time_created + datetime.timedelta(minutes=1)

    def get_coefficient(self):
        return 0.823

    def __str__(self):
        return self.name

class Message(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    body = models.CharField(max_length=200)
    name = models.CharField(max_length=200)
    
    def __str__(self):
        return self.name + ": " + self.body

class Watcher(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name

class Bet(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    name = models.CharField(max_length=200)
    value = models.CharField(max_length=200)

    def __str__(self):
        return self.name + " - " + self.value 

