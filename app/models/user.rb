class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User
<<<<<<< HEAD
=======

  has_many :posts, dependent: :destroy
>>>>>>> d5a0695f7600baf6827878aeec2808dcd3885b1c
end
