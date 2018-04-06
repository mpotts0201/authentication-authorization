class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
<<<<<<< HEAD
=======
  include CanCan::ControllerAdditions

  rescue_from CanCan::AccessDenied do |exception|
    render status: :unauthorized
  end
>>>>>>> d5a0695f7600baf6827878aeec2808dcd3885b1c
end
