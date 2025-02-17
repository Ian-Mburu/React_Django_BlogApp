# Serializers convert complex data (like model instances) into Python data types, which can be easily converted to JSON or XML. They also handle deserialization—converting incoming data back into model instances after validation.

from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer # type: ignore
from rest_framework import serializers # type: ignore

from . import models as api_models

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['full_name'] = user.full_name
        token['email'] = user.email
        token['username'] = user.username
        return token
# whats happening here is that we are extending the TokenObtainPairSerializer class and adding some custom fields to the token payload. In this case, we are adding the fullname, email, and username fields to the token payload. This will allow us to access these fields in the frontend when we receive the token. This is useful when you want to display the user's fullname, email, and username in the frontend after the user logs in.

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = api_models.User
        fields = ('email', 'username', 'password', 'password2')

    def validate(self, attr):
        if attr['password'] != attr['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        
        return attr
    
    def create(self, validated_data):
        user = api_models.User.objects.create(
            full_name = validated_data['full_name'],
            email = validated_data['email'],
            username = validated_data['username']
        )

        email_username, mobile = user.email.split('@')
        user.username = email_username

        user.set_password(validated_data['password'])
        user.save()

        return user
    
# whats happening here is that we are creating a RegisterSerializer class that extends the ModelSerializer class. We are adding the password and password2 fields to the serializer. We are also adding a validate method to validate the password and password2 fields. We are also adding a create method to create a new user instance and save it to the database. We are also setting the username field to the email username when creating a new user instance.


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.User
        fields = ('__all__')

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.Profile
        fields = ('__all__')

class CategorySerializer(serializers.ModelSerializer):
    def get_post_count(self, category):
        return category.posts.count()
    
    class Meta:
        model = api_models.Category
        fields = ('id', 'title', 'image', 'slug', 'post_count')

# whats happening here is that we are creating a CategorySerializer class that extends the ModelSerializer class. We are adding a get_post_count method to get the post count for each category. We are also adding the post_count field to the serializer. This will allow us to display the post count for each category in the frontend.

class CommentSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = api_models.Comment
        fields = ('__all__')

    def __init__(self, *args, **kwargs):
        super(CommentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 1

# whats happening here is that we are creating a CommentSerializer class that extends the ModelSerializer class. We are adding the depth field to the serializer. We are also setting the depth field to 0 when creating a new comment instance and 1 when updating an existing comment instance.

class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = api_models.Post
        fields = ('__all__')

    def __init__(self, *args, **kwargs):
        super(PostSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 1

class BookmarkSerializer(serializers.ModelSerializer):
    class Meta:
        model = api_models.BookMark
        fields = ('__all__')

    def __init__(self, *args, **kwargs):
        super(BookmarkSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 1

class NotificationSerializer(serializers.ModelSerializer):

    class Meta:
        model = api_models.Notification
        fields = ('__all__')

    def __init__(self, *args, **kwargs):
        super(NotificationSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        if request and request.method == 'POST':
            self.Meta.depth = 0
        else:
            self.Meta.depth = 1

class AuthorSerializer(serializers.ModelSerializer):
    views = serializers.IntegerField(default=0)
    likes = serializers.IntegerField(default=0)
    posts = serializers.SerializerMethodField()
    bookmarks = serializers.SerializerMethodField()