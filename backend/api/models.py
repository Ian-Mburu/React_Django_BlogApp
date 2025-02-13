from django.db import models
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django.utils.text import slugify
from shortuuid.django_fields import ShortUUIDField # type: ignore
import shortuuid # type: ignore


# Custom User Model
class User(AbstractUser):
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=150, null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        email_username, mobile = self.email.split('@')
        if self.full_name == '' or self.full_name == None:
            self.full_name = email_username
        if self.username == '' or self.username == None:
            self.username = email_username

        super(User, self).save(*args, **kwargs)
# Explanation - In the above code, we have created a custom user model by inheriting the AbstractUser class. We have added a new field full_name to the user model. We have overridden the save method to set the username and full_name fields if they are empty. We have also set the USERNAME_FIELD to email and REQUIRED_FIELDS to username.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    image = models.ImageField(upload_to='image', default='default/default-user.jpg', null=True, blank=True)
    full_name = models.CharField(max_length=150, null=True, blank=True)
    bio = models.TextField(null=True, blank=True)
    about = models.TextField(null=True, blank=True)
    author = models.BooleanField(default=False)
    country = models.CharField(max_length=150, null=True, blank=True)
    facebook = models.URLField(null=True, blank=True)
    twitter = models.URLField(null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.user.username

    def save(self, *args, **kwargs):
        if self.full_name == '' or self.full_name == None:
            self.full_name = self.user.full_name

        super(Profile, self).save(*args, **kwargs)


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)


class Category(models.Model):
    title = models.CharField(max_length=150)
    image = models.ImageField(upload_to='image', null=True, blank=True)
    slug = models.SlugField(max_length=150, unique=True, null=True, blank=True)

    def __str__(self):
        return self.title
    
    #class Meta:
     #   verbose_name_plural = 'Category'
    
    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.title)
        super(Category, self).save(*args, **kwargs)

    def post_count(self):
        return Post.objects.filter(Category=self).count()

# Slugify - The slugify() function is used to convert a string into a valid slug. A slug is a simplified version of a string, typically URL-friendly. The slugify() function converts the string into lowercase, removes spaces, and replaces special characters with hyphens. The slugify() function is commonly used to generate slugs for URLs, filenames, and other identifiers.

class Post(models.Model):

    STATUS = (
        ("Active", "Active"),
        ("Draft", "Draft"),
        ("Disabled", "Disabled"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, null=True, blank=True)
    Category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True, blank=True)
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    image = models.ImageField(upload_to='image', null=True, blank=True)
    status = models.CharField(max_length=150, choices=STATUS, default="Active")
    view = models.IntegerField(default=0)
    likes = models.IntegerField(default=0, blank=True)
    slug = models.SlugField(max_length=150, unique=True, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title
    
    class Meta:
        ordering = ['-date']
        verbose_name_plural = 'Posts'

    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.title) + "-" + shortuuid.uuid()[:2] # whats happening here is that we are generating a unique slug for each post by combining the title and a shortuuid. The shortuuid is a unique identifier that is generated using the shortuuid library. We are using the first two characters of the shortuuid to make the slug even more unique. This ensures that each post has a unique slug even if the title is the same. 
        super(Post, self).save(*args, **kwargs)


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    comment = models.TextField()
    reply = models.TextField( null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.post.title

    class Meta:
        ordering = ['-date']
        verbose_name_plural = 'Comment'

class BookMark(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.post.title

    class Meta:
        ordering = ['-date']
        verbose_name_plural = 'Bookmark'

class Notification(models.Model):
    NOTI_TYPE = (
        ("Like", "Like"),
        ("Comment", "Comment"),
        ("Bookmark", "Bookmark"),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    type = models.CharField(max_length=150, choices=NOTI_TYPE)
    seen = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.post:
            return f"{self.post.title} {self.type} by {self.user.username}"
        else:
            return "Notification"
        # whats happening here is that we are returning a string that contains the title of the post, the type of notification, and the username of the user who triggered the notification. If the post is deleted, we return "Notification" as the string.
    
    class Meta:
        ordering = ['-date']
        verbose_name_plural = 'Notification'