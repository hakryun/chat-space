# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false|
|name|string|null: false|
|email|string|null: false|
|password|integer|null: false|

### Association
- has_many :groups, through: :users_groups
- has_many :messages
- has_many :users_groups

## users_groupsテーブル
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :users
- belongs to :groups

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|group_id|integer|null: false|
|group_name|string|null: false|

### Association
- has_many :users, through: :users_groups
- has_many :messages
- has_many :users_groups

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|null: true|
|image|string|null: true|
|time|timestamp|null: false|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group