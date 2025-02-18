from django.contrib import admin
from django.utils.html import format_html
from api import models as api_models

class UserAdmin(admin.ModelAdmin):
    search_fields = ['full_name', 'username', 'email']
    list_display = ['username', 'email']

class ProfileAdmin(admin.ModelAdmin):
    search_fields = ['user__username']
    list_display = ['admin_thumbnail', 'user', 'full_name']
    
    def admin_thumbnail(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="50" />', obj.image.url)
        return "-"
    admin_thumbnail.short_description = 'Thumbnail'

class CategoryAdmin(admin.ModelAdmin):
    list_display = ['id', 'title', ]
    
    

class PostAdmin(admin.ModelAdmin):
    list_display = ["title", "user", "get_category", "view"]
    
    def get_category(self, obj):
        return obj.Category.title  # Assuming Post has a ForeignKey to Category named 'category'
    get_category.short_description = 'Category'

class CommentAdmin(admin.ModelAdmin):
    list_display = ['id', 'get_content_preview', 'get_post_category', 'user']
    
    def get_content_preview(self, obj):
        return f"{obj.body[:50]}..." if hasattr(obj, "body") else "No content"

    
    def get_post_category(self, obj):
        return obj.post.Category.title  # Assuming Comment has FK to Post, which has FK to Category
    get_post_category.short_description = 'Category'

class BookmarkAdmin(admin.ModelAdmin):
    list_display = ["user", "post"]

class NotificationAdmin(admin.ModelAdmin):
    list_display = ["user", "post", "type", "seen"]

admin.site.register(api_models.User, UserAdmin)
admin.site.register(api_models.Profile, ProfileAdmin)
admin.site.register(api_models.Category, CategoryAdmin)
admin.site.register(api_models.Post, PostAdmin)
admin.site.register(api_models.Comment, CommentAdmin)
admin.site.register(api_models.Notification, NotificationAdmin)
admin.site.register(api_models.BookMark, BookmarkAdmin)