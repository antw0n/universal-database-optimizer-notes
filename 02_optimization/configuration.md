# Configuration

This file contains notes on the configuration under which UDO is executed.

**Default**

This is the description of the default configuration that includes all possible parametrization options:
```yaml
database:
  driver: udo.drivers.mongodriver:MongoDriver
  config:
    connection-string: mongodb://[username:password@]host1[:port1][,...hostN[:portN]][/[defaultauthdb][?options]]
  queries: input/mongo/queries/s2/point_queries_experiment # Path to the query directory [set/experiment] sets=s1,s2,s3 01_experiments=point_queries_experiment,tpch_experiment
  indexes: input/mongo/index.json # path to the index file
  sys-params: input/mongo/sysparams.json # path to the system parameters file

tuning:
  # agent: udo.agent.ddpg_agent:run_ddpg_agent
  # agent: udo.agent.sarsa_agent:run_sarsa_agent
  # agent: udo.agent.udo_simplifed_agent:run_simplifed_udo_agent
  agent: udo.agent.udo_agent:run_udo_agent # reinforcement learning agent, choices 'udo', 'udo-s', 'ddpg', 'sarsa'
  config:
    duration: 1 # tuning time in hours
    horizon: 5 # number horizon for reinforcement agent
    light-horizon: 3 # number horizon for light parameters in UDO (horizon - heavy horizon)
    heavy-horizon: 3 # number horizon for heavy parameters in UDO
    query-time-out: 35 # default timeout in seconds for each query
    time-out-ratio: 1.1 # timeout ratio respect to default time
    max-delay-time: 5 # maximal delay time
    sample-rate: 1 # sampled rate from workload
    mcts-algorithm:
      update: RAVE # update policy of UDO tree search [CAPTURED | APPLIED | NOT WIRED]
      select: UCBV # selection policy of UDO tree search [CAPTURED | APPLIED | NOT WIRED]
      delay: UCB # delay selection policy [CAPTURED | NOT APPLIED]
      reward: delta # reward of reinforcement learning agent [CAPTURED | NOT APPLIED]
```
**Applied**

Notes on the variables:
- `queries` vary according to the experiment.
- `light-horizon`  is omitted due to automatic complement based on the number of system parameters.
- `heavy-horizon` is omitted due to automatic complement based on the amount of the applicable indexes.

This is the description of the amended version of the default configuration:
```yaml
database:
  config:
    connection-string: mongodb://mt-mongo:27011,mt-mongo:27012,mt-mongo:27013/tpch_mongo_1c?replicaSet=mt-exp-rs-001
  driver: udo.drivers.mongodriver:MongoDriver
  indexes: input/mongo/index.json
  queries: input/mongo/queries/s1/tpch_experiment <--- varies according to the experiment
  sys-params: input/mongo/sysparams.json
tuning:
  agent: udo.agent.udo_agent:run_udo_agent
  config:
    duration: 1
    max-delay-time: 5
    mcts-algorithm:
      delay: UCB
      reward: delta
      select: UCBV
      update: RAVE
    query-time-out: 35
    sample-rate: 1
    time-out-ratio: 1.1
```

