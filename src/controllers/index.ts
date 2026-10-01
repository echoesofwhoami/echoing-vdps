import { Application } from '@hotwired/stimulus'
import CopyCodeController from './copy_code_controller'
import NavbarController from './navbar_controller'
import ThemeTweakerController from './theme_tweaker_controller'

const application = Application.start()

application.register('navbar', NavbarController)

application.register('copy-code', CopyCodeController)

application.register('theme-tweaker', ThemeTweakerController)
