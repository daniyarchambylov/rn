from django.http import JsonResponse

from .models import Location


def locations_view(request):
    cities = Location.objects.filter(parent__isnull=True)
    regions = Location.objects.filter(parent_id__in=[x.id for x in cities])
    blocks = Location.objects.filter(parent__in=[x.id for x in regions])
    all = dict()

    for x in cities:
        all[x.id] = {'key': x.id, 'value': x.id, 'text': x.name, 'regions': dict()}
    for x in regions:
        all[x.parent_id]['regions'][x.id] = {'key': x.id, 'value': x.id, 'text': x.name, 'blocks': dict()}
    for x in blocks:
        all[x.parent.parent_id]['regions'][x.parent_id]['blocks'][x.id] = {'key': x.id, 'value': x.id, 'text': x.name}

    return JsonResponse(all)


def locations_all_view(request):
    all = Location.objects.all().values('id', 'name')
    return JsonResponse(list(all), safe=False)
