from django.urls import path
from .views import get_books, book_detail

urlpatterns = [
    path('books/', get_books, name='get_books'),  # GET & POST
    path('books/<int:pk>/', book_detail, name='book_detail'),  # PUT & DELETE
]
