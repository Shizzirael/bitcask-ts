# Bitcask-TS: A TypeScript Database Engine

A simplified clone of the Bitcask database architecture, built from scratch in TypeScript and Node.js. This engine combines the speed of an in-memory hash table with the durability of an append-only log.

## 🚀 Core Architecture

*   **Append-Only Log:** Write operations (`set`) strictly append data to the end of the log file, ensuring maximum sequential write performance.
*   **In-Memory Index (KeyDir):** A strongly-typed `Map` in RAM tracks the metadata for each key (exact byte offset and size on disk) rather than the values themselves.
*   **Single Disk Seek:** Read operations (`get`) query the RAM index in **O(1)** time. Using the retrieved coordinates, the engine performs a targeted disk seek, loading only the necessary bytes into a dynamically allocated `Buffer` without scanning the entire file.

## 🗺️ Roadmap & Future Improvements

Currently, the in-memory index is volatile and lost upon process termination. The following architectural upgrades are planned to evolve this prototype into a fully resilient database:

*   **Boot Recovery:** A startup routine that sequentially scans the log file to dynamically rebuild the `keyDir` index in RAM upon database initialization.
*   **Direct Binary Format:** Replacing JSON serialization with a custom binary format. Implementing a fixed-size header (CRC, Timestamp, Key Size, Value Size) will eliminate CPU parsing overhead and drastically reduce disk footprint.
*   **Merging & Compaction:** A background garbage-collection process to clean up obsolete or deleted records (using tombstones) and reclaim disk space.