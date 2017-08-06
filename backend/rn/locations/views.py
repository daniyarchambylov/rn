from django.http import JsonResponse

from .models import Location


def locations_view(request):
    cities = Location.objects.filter(parent__isnull=True)
    regions = Location.objects.filter(parent_id__in=[x.id for x in cities])
    blocks = Location.objects.filter(parent__in=[x.id for x in regions])
    all = dict()

    for x in cities:
        all[x.id] = {'id': x.id, 'name': x.name, 'regions': dict()}
    for x in regions:
        all[x.parent_id]['regions'][x.id] = {'id': x.id, 'name': x.name, 'blocks': dict()}
    for x in blocks:
        all[x.parent.parent_id]['regions'][x.parent_id]['blocks'][x.id] = {'id': x.id, 'name': x.name}

    return JsonResponse(all)
