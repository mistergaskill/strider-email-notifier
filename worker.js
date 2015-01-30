module.exports = {
  init: function (config, job, context, callback) {
    return callback(null, {
      listen: function (emitter) {
        var errored_listener = function (jobId) {
          // In case an error occured, ignore tested event
          emitter.off('job.status.tested', tested_listener)
          emitter.emit('plugin.emailNotifier.send', jobId, config)
        };
        var tested_listener = function (jobId) {
          // If test phase done, ignore error event as it might be triggered by a future job
          emitter.off('job.status.phase.errored', errored_listener)
          emitter.emit('plugin.emailNotifier.send', jobId, config)
        };
        emitter.once('job.status.tested', tested_listener)
        emitter.once('job.status.phase.errored', errored_listener)
      }
    })
  }
}
