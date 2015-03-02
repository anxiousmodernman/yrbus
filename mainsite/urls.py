from django.conf.urls import url
from django.conf.urls import include

urlpatterns = [
    url(r'^', include('yrbus.urls'))
] 


urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework')),
]