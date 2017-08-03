from django.db import models


class Location(models.Model):
    name = models.CharField(max_length=255)
    parent = models.ForeignKey('self', blank=True, null=True)

    def __str__(self):
        return self.name

    def list_children(self):
        return Location.objects.filter(parent=self)