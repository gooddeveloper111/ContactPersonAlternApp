class Image < ActiveRecord::Base

  validates :author, 
    presence: true
  validates :description,
    presence: true
  validates :img_url,
    presence: true

end