import path from 'path'

import {PROJECT_TYPES} from '../constants'
import createProject, {validateProjectType} from '../createProject'
import {UserError} from '../errors'

export default function init(args, cb) {
  if (args._.length === 1) {
    return cb(new UserError(`usage: nwb init [${PROJECT_TYPES.join('|')}] [name]`))
  }

  let projectType = args._[1]
  try {
    validateProjectType(projectType)
  }
  catch (e) {
    return cb(e)
  }

  let name = args._[2]
  if (!name) {
    name = path.basename(process.cwd())
  }

  console.log(`Initialising a ${projectType} project...`)
  createProject(args, projectType, name, process.cwd(), cb)
}
